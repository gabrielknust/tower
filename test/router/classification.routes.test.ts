import request from 'supertest';
import { db } from '../../postgres/database';

describe('/classification', () => {
    const createdClassificationIds = new Set<number>();
    const createdPlayerIds = new Set<number>();
    const createdTowerIds = new Set<number>();

    afterAll(async () => {
        await db.destroy();
    });

    afterEach(async () => {
        const classificationIds = [...createdClassificationIds].filter(id => id);
        const playerIds = [...createdPlayerIds].filter(id => id);
        const towerIds = [...createdTowerIds].filter(id => id);

        const deletePromises = [];
        if (classificationIds.length > 0) {
            deletePromises.push(
                db('classification').whereIn('id', classificationIds).del()
            );
        }
        if (playerIds.length > 0) {
            deletePromises.push(
                db('player').whereIn('fighter_id', playerIds).del()
            );
        }
        if (towerIds.length > 0) {
            deletePromises.push(
                db('tower').whereIn('id', towerIds).del()
            );
        }
        await Promise.all(deletePromises);

        createdClassificationIds.clear();
        createdPlayerIds.clear();
        createdTowerIds.clear();
    });

    it('should create a new classification', async () => {
        // Arrange
        const player_id = 9999991;
        const tower_id = 8888881;
        await db('player').insert({ fighter_id: player_id, name: 'p1', cfn: 'c1' });
        await db('tower').insert({ id: tower_id, name: 't1' });
        createdPlayerIds.add(player_id);
        createdTowerIds.add(tower_id);
        const body = { player_id, tower_id };

        // Act
        const response = await request('http://localhost:8005').post('/classification').send(body);
        const classification = await db('classification').where({ player_id, tower_id }).first();
        if (classification) createdClassificationIds.add(classification.id);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({ player_id: player_id.toString(), tower_id });
        expect(classification).toMatchObject({ player_id: player_id.toString(), tower_id});
    });

    it('should return 200 and list all classifications', async () => {
        // Act
        const response = await request('http://localhost:8005').get('/classification');

        // Assert
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 200 and get classification by id', async () => {
        // Arrange
        const player_id = 9999992;
        const tower_id = 8888882;
        const position = 1;
        await db('player').insert({ fighter_id: player_id, name: 'p2', cfn: 'c2' });
        await db('tower').insert({ id: tower_id, name: 't2' });
        createdPlayerIds.add(player_id);
        createdTowerIds.add(tower_id);
        const [classification] = await db('classification').insert({ player_id, tower_id, position }).returning('*');
        createdClassificationIds.add(classification.id);
        console.log('Classification created for test:', classification);

        // Act
        const response = await request('http://localhost:8005').get(`/classification/${classification.id}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ id: classification.id, player_id: player_id.toString(), tower_id });
    });

    it('should return 404 if classification to get is not found', async () => {
        // Arrange
        const id = 99999999;

        // Act
        const response = await request('http://localhost:8005').get(`/classification/${id}`);

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Classificação não encontrada.' });
    });

    it('should return 200 and update the classification', async () => {
        // Arrange
        const player_id = 9999993;
        const tower_id = 8888883;
        await db('player').insert({ fighter_id: player_id, name: 'p3', cfn: 'c3' });
        await db('tower').insert({ id: tower_id, name: 't3' });
        createdPlayerIds.add(player_id);
        createdTowerIds.add(tower_id);
        const [classification] = await db('classification').insert({ player_id, tower_id, position: 1 }).returning('*');
        createdClassificationIds.add(classification.id);
        const newPosition = 2;

        // Act
        const response = await request('http://localhost:8005').put(`/classification/${classification.id}`).send({ player_id, tower_id, position: newPosition });
        const updated = await db('classification').where('id', classification.id).first();

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ id: classification.id, player_id: player_id.toString(), tower_id, position: newPosition });
        expect(updated.position).toBe(newPosition);
    });

    it('should return 404 if classification to update is not found', async () => {
        // Arrange
        const id = 99999999;

        // Act
        const response = await request('http://localhost:8005').put(`/classification/${id}`).send({ player_id: 1, tower_id: 1, position: 1 });

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Classificação não encontrada.' });
    });

    it('should return 200 and delete the classification', async () => {
        // Arrange
        const player_id = 9999994;
        const tower_id = 8888884;
        const position = 1;
        await db('player').insert({ fighter_id: player_id, name: 'p4', cfn: 'c4' });
        await db('tower').insert({ id: tower_id, name: 't4' });
        createdPlayerIds.add(player_id);
        createdTowerIds.add(tower_id);
        const [classification] = await db('classification').insert({ player_id, tower_id, position }).returning('*');
        createdClassificationIds.add(classification.id);

        // Act
        const response = await request('http://localhost:8005').delete(`/classification/${classification.id}`);
        const deleted = await db('classification').where('id', classification.id).first();

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Classificação deletada com sucesso.' });
        expect(deleted).toBeUndefined();
    });

    it('should return 404 if classification to delete is not found', async () => {
        // Arrange
        const id = 99999999;

        // Act
        const response = await request('http://localhost:8005').delete(`/classification/${id}`);

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Classificação não encontrada.' });
    });
});
