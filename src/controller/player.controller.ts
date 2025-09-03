import { Request, Response } from "express";
import { Player } from "../model/player";
import { db } from "../../postgres/database";

async function createPlayer(req: Request, res: Response) {
    try {
        const { name, fighter_id, cfn } = req.body;
        const player = new Player(fighter_id, cfn, name);

        // Usando Knex para inserir
        const result = await db('players')
            .insert({
                name: player.name,
                fighter_id: player.fighterId,
                cfn: player.cfn
            })
            .returning(['name', 'fighter_id', 'cfn']);

        res.status(201).json(result[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao inserir jogador." });
    }
}

export const playerController = {
    createPlayer
};