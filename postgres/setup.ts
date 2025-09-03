import { createPlayerTable } from './model/player.ts';
import { createTowerTable } from './model/tower.ts';
import { createMatchTable } from './model/match.ts';
import { insertPlayers, insertTowers, insertTowerClassification, insertMatches } from './dataInsert.ts';

async function setupDatabase() {
    try {
        console.log('Conectado ao banco de dados.');

        // Criar tabelas
        await createPlayerTable();
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
        console.log('Conexão com o banco de dados encerrada.');
    }
}

setupDatabase();
