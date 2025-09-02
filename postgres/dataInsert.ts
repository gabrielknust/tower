import { db } from './database';

export async function insertMatches() {
    const matches = [
        { date_match: '2025-08-15', challenger: 3752571501, holder: 2389902601, winner: 3752571501, looser: 2389902601, observation: null, status: 'Concluída' },
        { date_match: '2025-08-15', challenger: 3545942489, holder: 2681846811, winner: 3545942489, looser: 2681846811, observation: null, status: 'Concluída' },
        { date_match: '2025-08-16', challenger: 1742615156, holder: 4257483488, winner: 1742615156, looser: 4257483488, observation: null, status: 'Concluída' },
        { date_match: '2025-08-16', challenger: 3752571501, holder: 3334685649, winner: 3752571501, looser: 3334685649, observation: null, status: 'Concluída' },
        { date_match: '2025-08-17', challenger: 2570337658, holder: 2389902601, winner: 2570337658, looser: 2389902601, observation: null, status: 'Concluída' }
    ];
    for (const t of matches) {
        await db.query(
            'INSERT INTO partidas (date_match, challenger, holder, winner, looser, observation, status) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING',
            [t.date_match, t.challenger, t.holder, t.winner, t.looser, t.observation, t.status]
        );
    }
}

export async function insertPlayers() {
    const players = [
        { fighter_id: 3752571501, cfn: 'Tweny', name: 'Junior' },
        { fighter_id: 3545942489, cfn: 'Capyvas', name: 'Matheus Felipe' },
        { fighter_id: 2681846811, cfn: 'Pertuba', name: 'Renan Botion' },
        { fighter_id: 2241308309, cfn: 'Ninja-Garatuja', name: 'Carlos Silvino' },
        { fighter_id: 1707819269, cfn: 'oneightytwo', name: 'Gustavo Lima' },
        { fighter_id: 2060367986, cfn: 'Dézio', name: 'Dézio Souza' },
        { fighter_id: 3016268323, cfn: 'Bigas', name: 'Raphael Righetti' },
        { fighter_id: 2764905001, cfn: 'Paiva', name: 'Gustavo Paiva' },
        { fighter_id: 3334685649, cfn: 'Franco|Fighter', name: 'Joao Vinicius' },
        { fighter_id: 2570337658, cfn: 'Martins', name: 'Martins' },
        { fighter_id: 3864615438, cfn: 'Balasmoke', name: 'Gabriel' },
        { fighter_id: 2389902601, cfn: 'Raichu', name: 'Matheus Goulart' },
        { fighter_id: 1742615156, cfn: 'Nami Cinna', name: 'William' },
        { fighter_id: 3343020993, cfn: 'Shimmy Boy', name: 'Roberto Oliveira' },
        { fighter_id: 4257483488, cfn: 'Skykeru', name: 'Lucas Mel' },
        { fighter_id: 1333762832, cfn: 'Oldboy', name: 'Otto' },
        { fighter_id: 1559634462, cfn: 'Odeto Roittman', name: 'Alvaro Augusto' },
        { fighter_id: 3963576032, cfn: 'waddhamner', name: 'Vinicius' }
    ];
    for (const p of players) {
        await db.query(
            'INSERT INTO player (fighter_id, cfn, name) VALUES ($1, $2, $3) ON CONFLICT (fighter_id) DO NOTHING',
            [p.fighter_id, p.cfn, p.name]
        );
    }
}

export async function insertTowers() {
    const towers = [
        { name: 'Torre Mestre'},
        { name: 'Torre Aprendiz'}
    ];
    for (const t of towers) {
        await db.query(
            'INSERT INTO tower (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
            [t.name]
        );
    }
}

export async function insertTowerClassification() {
    const classifications = [
        { player_id: 3752571501, tower_id: 1, position: 1 },
        { player_id: 3545942489, tower_id: 1, position: 2 },
        { player_id: 2681846811, tower_id: 1, position: 3 },
        { player_id: 2241308309, tower_id: 1, position: 4 },
        { player_id: 1707819269, tower_id: 1, position: 5 },
        { player_id: 2060367986, tower_id: 1, position: 6 },
        { player_id: 3016268323, tower_id: 1, position: 7 },
        { player_id: 2764905001, tower_id: 1, position: 8 },
        { player_id: 3334685649, tower_id: 1, position: 9 },
        { player_id: 2570337658, tower_id: 1, position: 10 },
        { player_id: 3864615438, tower_id: 1, position: 11 },
        { player_id: 2389902601, tower_id: 1, position: 12 },
        { player_id: 1742615156, tower_id: 1, position: 13 },
        { player_id: 3343020993, tower_id: 1, position: 14 },
        { player_id: 4257483488, tower_id: 1, position: 15 },
        { player_id: 1333762832, tower_id: 1, position: 16 },
        { player_id: 1559634462, tower_id: 1, position: 17 },
        { player_id: 3963576032, tower_id: 1, position: 18 }
    ];
    for (const c of classifications) {
        await db.query(
            'INSERT INTO classification (player_id, tower_id, position) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
            [c.player_id, c.tower_id, c.position]
        );
    }
}