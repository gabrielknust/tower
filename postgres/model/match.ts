import { db } from '../database.ts';

export async function createMatchTable() {
    const exists = await db.schema.hasTable('match');
    if (!exists){
        await db.schema.createTable('match', (table) => {
            table.increments('id').primary();
            table.timestamp('date_match').notNullable();
            table.bigInteger('challenger').notNullable().references('fighter_id').inTable('player');
            table.bigInteger('holder').notNullable().references('fighter_id').inTable('player');
            table.bigInteger('winner').references('fighter_id').inTable('player');
            table.bigInteger('looser').references('fighter_id').inTable('player');
            table.text('observation');
            table.string('status', 50).notNullable().defaultTo('Agendada');
        });
    }else{
        console.error("Tabela match já existe!");
    }
}