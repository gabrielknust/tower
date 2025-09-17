import request from 'supertest';
import { db } from '../../postgres/database';

describe('/tower', () => {
    const createdTowerIds = new Set<number>();

    afterAll(async () => {
        await db.destroy();
    });

    afterEach(async () => {
        for (const id of createdTowerIds) {
            await db('tower').where('id', id).del();
        }
        createdTowerIds.clear();
    });

    it('should create a new tower', async () => {
        // Arrange
        const name = 'Torre Teste';
        const body = { name };

        // Act
        const response = await request('http://localhost:8005').post('/tower').send(body);
        const tower = await db('tower').where('name', name).first();
        if (tower) createdTowerIds.add(tower.id);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({ name });
        expect(tower).toMatchObject({ name });
    });

    it('should return 200 and list all towers', async () => {
        // Act
        const response = await request('http://localhost:8005').get('/tower');

        // Assert
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 200 and get tower by id', async () => {
        // Arrange
        const name = 'Torre Busca';
        const [tower] = await db('tower').insert({ name }).returning('*');
        createdTowerIds.add(tower.id);

        // Act
        const response = await request('http://localhost:8005').get(`/tower/${tower.id}`);

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ id: tower.id, name });
    });

    it('should return 404 if tower to get is not found', async () => {
        // Arrange
        const id = 99999999;

        // Act
        const response = await request('http://localhost:8005').get(`/tower/${id}`);

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Torre não encontrada.' });
    });

    it('should return 200 and update the tower', async () => {
        // Arrange
        const name = 'Torre Atualizar';
        const [tower] = await db('tower').insert({ name }).returning('*');
        createdTowerIds.add(tower.id);
        const newName = 'Torre Atualizada';

        // Act
        const response = await request('http://localhost:8005').put(`/tower/${tower.id}`).send({ name: newName });
        const updated = await db('tower').where('id', tower.id).first();

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ id: tower.id, name: newName });
        expect(updated.name).toBe(newName);
    });

    it('should return 404 if tower to update is not found', async () => {
        // Arrange
        const id = 99999999;

        // Act
        const response = await request('http://localhost:8005').put(`/tower/${id}`).send({ name: 'Qualquer' });

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Torre não encontrada.' });
    });

    it('should return 200 and delete the tower', async () => {
        // Arrange
        const name = 'Torre Deletar';
        const [tower] = await db('tower').insert({ name }).returning('*');
        createdTowerIds.add(tower.id);

        // Act
        const response = await request('http://localhost:8005').delete(`/tower/${tower.id}`);
        const deleted = await db('tower').where('id', tower.id).first();

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Torre deletada com sucesso.' });
        expect(deleted).toBeUndefined();
    });

    it('should return 404 if tower to delete is not found', async () => {
        // Arrange
        const id = 99999999;

        // Act
        const response = await request('http://localhost:8005').delete(`/tower/${id}`);

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Torre não encontrada.' });
    });
});
