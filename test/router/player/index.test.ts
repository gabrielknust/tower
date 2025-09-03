import request from 'supertest';
import { db } from '../../../postgres/database';

describe('POST /player', () => {
    afterAll(async () => {
        // Encerra a conexão com o banco após todos os testes
        await db.destroy();
    });

    it('should create a new player', async () => {
        const name = 'player1';
        const cfn = "123456";
        const fighter_id = "12355533";
        const body = { name, cfn, fighter_id };
        const response = await request('http://localhost:8005').post('/player').send(body);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ name, cfn, fighter_id });

        const count = await db('players').where('fighter_id', fighter_id).select().count();
        expect(count[0]['count']).toBe('1');
        await db('players').where('fighter_id', fighter_id).del();
    });
});