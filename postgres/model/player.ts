import { db } from '../database.ts';

export async function createPlayerTable() {
    const exists = await db.schema.hasTable('players');
    if (!exists){
        await db.schema.createTable('players', function (table) {
            table.bigInteger('fighter_id').primary();
            table.string('cfn', 255).notNullable();
            table.string('name', 255);
        });
    }else{
        console.error("Tabela players já existe!");
    }
}