import { db } from '../database.ts';

export async function createTowerTable() {
    const exists = await db.schema.hasTable('tower');
    if (!exists){
        await db.schema.createTable('tower', (table) => {
            table.increments('id').primary();
            table.string('name', 100).notNullable().unique();
        }) ;
    }else{
        console.error("Tabela tower já existe!");
    }

    const classExists = await db.schema.hasTable('classification');
    if (!classExists){
        await db.schema.createTable('classification', (table) => {
            table.increments('id').primary();
            table.bigInteger('player_id').references('fighter_id').inTable('player').onDelete('CASCADE');
            table.integer('tower_id').references('id').inTable('tower').onDelete('CASCADE');
            table.integer('position').notNullable();
            table.unique(['tower_id', 'position']);
            table.unique(['player_id', 'tower_id']);
        });
    }else{
        console.error("Tabela classification já existe!");
    }

    
}