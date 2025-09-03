import { db } from './database.ts';

async function dropTables() {
    try {
        await db.schema.dropTableIfExists('classifications');
        await db.schema.dropTableIfExists('matches');
        await db.schema.dropTableIfExists('players');
        await db.schema.dropTableIfExists('towers');
        console.log('Todas as tabelas foram removidas com sucesso.');
    } catch (error) {
        console.error('Erro ao remover tabelas:', error);
    }
}

dropTables();
