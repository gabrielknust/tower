import { db } from '../database.ts';

export async function createMatchTable() {
    const exists = await db.schema.hasTable('matches');
    if (!exists){
        await db.schema.createTable('matches', (table) => {
            table.increments('id').primary();
            table.timestamp('date_match').notNullable();
            table.bigInteger('challenger').notNullable().references('fighter_id').inTable('players');
            table.bigInteger('holder').notNullable().references('fighter_id').inTable('players');
            table.bigInteger('winner').references('fighter_id').inTable('players');
            table.bigInteger('looser').references('fighter_id').inTable('players');
            table.text('observation');
            table.string('status', 50).notNullable().defaultTo('Agendada');
        });
    }else{
        console.error("Tabela matches já existe!");
    }
}