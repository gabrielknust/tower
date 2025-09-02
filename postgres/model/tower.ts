import {db} from '../database';

export async function createTowerTable() {
    await db.query('CREATE TABLE IF NOT EXISTS tower (id SERIAL PRIMARY KEY,name VARCHAR(100) NOT NULL UNIQUE)');
    await db.query('CREATE TABLE IF NOT EXISTS classification (id SERIAL PRIMARY KEY,player_id BIGINT REFERENCES player(fighter_id),tower_id INT REFERENCES tower(id),position INT NOT NULL,UNIQUE (tower_id, position),UNIQUE (player_id, tower_id))');
}