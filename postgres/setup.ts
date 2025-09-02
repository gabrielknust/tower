import { db } from './database';
import { createUserTable } from './model/player';
import { createTowerTable } from './model/tower';
import { createMatchTable } from './model/match';
import { insertPlayers, insertTowers, insertTowerClassification, insertMatches } from './dataInsert';

async function setupDatabase() {
    try {
        await db.connect();
        console.log('Conectado ao banco de dados.');

        // Criar tabelas
        await createUserTable();
        await createTowerTable();
        await createMatchTable();

        // Inserir dados 
        await insertPlayers();
        await insertTowers();
        await insertTowerClassification();
        await insertMatches();

        console.log('Setup do banco de dados concluído com sucesso!');
    } catch (error) {
        console.error('Erro durante o setup do banco de dados:', error);
    } finally {
        await db.end();
        console.log('Conexão com o banco de dados encerrada.');
    }
}

setupDatabase();
