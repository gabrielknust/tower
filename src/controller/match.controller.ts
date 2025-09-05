import { Request, Response } from "express";
import { Match } from "../model/Match";
import { db } from "../../postgres/database";

//TODO: refatorar para inserir vencedor, perdedor, observação e status da partida e inserir lógica correta.

export const createMatch = async (req: Request, res: Response) => {
    const { challenger, holder, date_match } = req.body;
    const match = new Match(0,date_match,challenger, holder);
    try {
        const result = await db('match')
            .insert({
                challenger: match.challenger,
                holder: match.holder,
                match_date: match.date_match
            })
            .returning('*');
        res.status(201).json(result[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao inserir partida." });
    }
}

export const getAllMatches = async (req: Request, res: Response) => {
    try {
        const matches = await db('match')
        .join('player as p1', 'match.challenger', 'p1.fighter_id')
        .join('player as p2', 'match.holder', 'p2.fighter_id')
        .select('*');
        res.status(200).json(matches);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar partidas." });
    }
};

export const getMatchById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const match = await db('match')
            .where({ id: id })
            .join('player as p1', 'match.challenger', 'p1.fighter_id')
            .join('player as p2', 'match.holder', 'p2.fighter_id')
            .first();
        if (match) {
            return res.status(200).json(match);
        } else {
            return res.status(404).json({ error: "Partida não encontrada." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar partida." });
    }   
}