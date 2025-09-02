import { db } from '../database';

export async function createMatchTable() {
    await db.query('CREATE TABLE IF NOT EXISTS partidas (id SERIAL PRIMARY KEY,date_match TIMESTAMPTZ NOT NULL,challenger BIGINT NOT NULL REFERENCES player(fighter_id),holder BIGINT NOT NULL REFERENCES player(fighter_id),winner BIGINT NOT NULL REFERENCES player(fighter_id),looser BIGINT NOT NULL REFERENCES player(fighter_id),observation TEXT,status VARCHAR(50) NOT NULL DEFAULT \'Agendada\')');
}