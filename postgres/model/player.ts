import {db} from '../database';

export async function createUserTable() {
    await db.query('CREATE TABLE IF NOT EXISTS player (fighter_id BIGINT PRIMARY KEY,cfn VARCHAR(255) NOT NULL,name VARCHAR(255))');
}