import { db } from '../database.ts';

export async function createTowerTable() {
    const exists = await db.schema.hasTable('towers');
    if (!exists){
        await db.schema.createTable('towers', (table) => {
            table.increments('id').primary();
            table.string('name', 100).notNullable().unique();
        }) ;
    }else{
        console.error("Tabela towers já existe!");
    }

    const classExists = await db.schema.hasTable('classifications');
    if (!classExists){
        await db.schema.createTable('classifications', (table) => {
            table.increments('id').primary();
            table.bigInteger('player_id').references('fighter_id').inTable('players');
            table.integer('tower_id').references('id').inTable('towers');
            table.integer('position').notNullable();
            table.unique(['tower_id', 'position']);
            table.unique(['player_id', 'tower_id']);
        });
    }else{
        console.error("Tabela classifications já existe!");
    }

    
}