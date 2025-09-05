import { db } from './database.ts';

async function dropTables() {
    try {
        await db.schema.dropTableIfExists('classification');
        await db.schema.dropTableIfExists('matche');
        await db.schema.dropTableIfExists('player');
        await db.schema.dropTableIfExists('tower');
        console.log('Todas as tabelas foram removidas com sucesso.');
    } catch (error) {
        console.error('Erro ao remover tabelas:', error);
    }
}

dropTables();
