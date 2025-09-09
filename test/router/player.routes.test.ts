import request from 'supertest';
import { db } from '../../postgres/database';

describe('POST /player', () => {
    afterAll(async () => {
        await db.destroy();
    });

    it('should create a new player', async () => {
        const name = 'player1';
        const cfn = "player bobao";
        const fighter_id = 12355533;
        const tower_id = 2;
        const body = { name, cfn, fighter_id, tower_id };
        try {
            const response = await request('http://localhost:8005').post('/player').send(body);
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ name, cfn, fighter_id });
            const count = await db('players').where('fighter_id', fighter_id).select().count();
            expect(count[0]['count']).toBe('1');
        } catch (error) {
            console.error(error);
        }
        finally {
            await db('player').where('fighter_id', fighter_id).del();
        }
    });

    it('should return 400 if name is missing', async () => {
        const name = "";
        const cfn = "player bobao";
        const fighter_id = 12355533;
        const tower_id = 2;
        const body = { name, cfn, fighter_id, tower_id };
        const response = await request('http://localhost:8005').post('/player').send(body);
        const errorMessages = JSON.parse(response.body.errors.message);
        expect(response.status).toBe(400);
        expect(errorMessages).toMatchObject([
            {
                code: 'too_small',
                path: ['name'],
                message: expect.stringContaining("O campo 'name' é obrigatório."),
            },
        ]);
    });

    it('should return 400 if cfn is missing', async () => {
        const name = 'player1';
        const fighter_id = 12355533;
        const tower_id = 2;
        const body = { name, fighter_id, tower_id };
        const response = await request('http://localhost:8005').post('/player').send(body);
        const errorMessages = JSON.parse(response.body.errors.message);
        expect(response.status).toBe(400);
        expect(errorMessages).toMatchObject([
            {
                code: 'invalid_type',
                path: ['cfn'],
                message: expect.stringContaining("Invalid input: expected string, received undefined"),
            },
        ]);
    });

    it.only('should return 400 if fighter_id is missing', async () => {
        const name = 'player1';
        const cfn = "player bobao";
        const fighter_id = 0;
        const tower_id = 2;
        const body = { name, cfn, tower_id };
        const response = await request('http://localhost:8005').post('/player').send(body);
        const errorMessages = JSON.parse(response.body.errors.message);
        expect(response.status).toBe(400);
        expect(errorMessages).toMatchObject([
            {
                code: 'invalid_type',
                path: ['fighter_id'],
                message: expect.stringContaining("Invalid input: expected string, received undefined"),
            },
        ]);
    });

    it('should return 400 if tower_id is missing', async () => {
        const name = 'player1';
        const cfn = "player bobao";
        const fighter_id = 12355533;
        const body = { name, cfn, fighter_id };
        const response = await request('http://localhost:8005').post('/player').send(body);
        const errorMessages = JSON.parse(response.body.errors.message);
        expect(response.status).toBe(400);
        expect(errorMessages).toMatchObject([
            {
                code: 'invalid_type',
                path: ['tower_id'],
                message: expect.stringContaining("Invalid input: expected string, received undefined"),
            },
        ]);
    });

    it('should return 409 if fighter_id already exists', async () => {
        const name = 'player1';
        const cfn = "player bobao";
        const fighter_id = 12355533;
        const tower_id = 2;
        const body = { name, cfn, fighter_id, tower_id };
        await db('players').insert({ name, cfn, fighter_id, tower_id });
        const response = await request('http://localhost:8005').post('/player').send(body);
        expect(response.status).toBe(409);
        expect(response.body).toEqual({ error: 'Fighter ID already exists' });
        await db('players').where('fighter_id', fighter_id).del();
    });

    it('should return 200 and delete the player', async () => {
        const name = 'player1';
        const cfn = "player bobao";
        const fighter_id = 12355533;
        const tower_id = 2;
        await db('players').insert({ name, cfn, fighter_id, tower_id });
        const response = await request('http://localhost:8005').delete(`/player/${fighter_id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Player deleted successfully' });
        const count = await db('players').where('fighter_id', fighter_id).select().count();
        expect(count[0]['count']).toBe('0');
    });

    it('should return 404 if player to delete is not found', async () => {
        const fighter_id = 99999999;
        const response = await request('http://localhost:8005').delete(`/player/${fighter_id}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Player not found' });
    });

    it('should return 200 and update the player', async () => {
        const name = 'player1';
        const cfn = "player bobao";
        const fighter_id = 12355533;
        const tower_id = 2;
        await db('players').insert({ name, cfn, fighter_id, tower_id });
        const response = await request('http://localhost:8005').put(`/player/${fighter_id}`).send({ name: 'player1_updated' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Player updated successfully' });
        const updatedPlayer = await db('players').where('fighter_id', fighter_id).first();
        expect(updatedPlayer.name).toBe('player1_updated');
        await db('players').where('fighter_id', fighter_id).del();
    });

    it('should return 404 if player to update is not found', async () => {
        const fighter_id = 99999999;
        const response = await request('http://localhost:8005').put(`/player/${fighter_id}`).send({ name: 'player1_updated' });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Player not found' });
    });

    it('should return 200 and list all players', async () => {
        const response = await request('http://localhost:8005').get('/player');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('cfn');
        expect(response.body[0]).toHaveProperty('fighter_id');
        expect(response.body[0]).toHaveProperty('tower_id');
    });

    it('should return 200 and get player by fighter_id', async () => {
        const name = 'player1';
        const cfn = "player bobao";
        const fighter_id = 12355533;
        const tower_id = 2;
        await db('players').insert({ name, cfn, fighter_id, tower_id });
        const response = await request('http://localhost:8005').get(`/player/${fighter_id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ name, cfn, fighter_id, tower_id });
        await db('players').where('fighter_id', fighter_id).del();
    });

    it('should return 404 if player to get is not found', async () => {
        const fighter_id = 99999999;
        const response = await request('http://localhost:8005').get(`/player/${fighter_id}`);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Player not found' });
    });


});