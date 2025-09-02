import request from 'supertest';
import express from 'express';

describe('POST /player', () => {
    it('should create a new player', async () => {
        const name = 'player1';
        const cfn = "123456";
        const fighter_id = "12355533";
        const body = {name,cfn,fighter_id};
        const response = await request('http://localhost:8005').post('/player').send(body);
        expect(response.status).toBe(201);
        console.log(response);
        expect(response.body).toEqual({ name, cfn, fighter_id });
    },100000);
});