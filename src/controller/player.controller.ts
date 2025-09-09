import { Request, Response } from "express";
import { Player } from "../model/Player";
import { db } from "../../postgres/database";
import * as z from 'zod';

export async function createPlayer(req: Request, res: Response) {
    const trx = await db.transaction();
    const fighterSchema = z.object({
        name: z.string("O campo 'nome' é obrigatório.").min(1, "O campo 'name' é obrigatório."),
        fighter_id: z.number("O campo 'fighter_id' é obrigatório e deve ser um número inteiro").int("O 'fighter_id' deve ser um número inteiro"),
        cfn: z.string("O campo 'cfn' é obrigatório.").min(1, "O campo 'cfn' é obrigatório."),
        tower_id: z.number("O campo 'tower_id' é obrigatório e deve ser um número inteiro.").int("O 'tower_id' deve ser um número inteiro.")
    });
    try {
        fighterSchema.parse(req.body);
        const { name, fighter_id, cfn, tower_id } = req.body;
        const player = new Player(fighter_id, cfn, name);
        const existingPlayer = await trx('player')
            .where({ fighter_id: player.fighterId })
            .first();
        let result;
        if (existingPlayer && existingPlayer.deleted_at != null) {
            result = await trx('player')
                .where({ fighter_id: player.fighterId })
                .update({
                    name: player.name,
                    cfn: player.cfn,
                    deleted_at: null
                })
                .returning(['name', 'fighter_id', 'cfn', 'deleted_at']);
        } else if (existingPlayer && existingPlayer.deleted_at==null) {
            return res.status(409).json({ error: 'Fighter ID already exists' });
        } else {
            result = await trx('player')
                .insert({
                    name: player.name,
                    fighter_id: player.fighterId,
                    cfn: player.cfn
                })
                .returning(['name', 'fighter_id', 'cfn', 'deleted_at']);
        }
        const insertTower = await trx('classification')
            .insert({
                player_id: fighter_id,
                tower_id: tower_id,
                position: trx.raw('(SELECT COALESCE(MAX(position), 0) + 1 FROM classification WHERE tower_id = ?)', [tower_id])
            })
            .returning('*');

        await trx.commit();
        res.status(201).json({ player: result[0], classification: insertTower[0] });
    } catch (err) {
        await trx.rollback();
        if(err instanceof z.ZodError) {
            return res.status(400).json({ errors: err });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro ao inserir jogador e classificação." });
    }
}

export async function getPlayerById(req: Request, res: Response) {
    const paramsSchema = z.object({
        fighter_id: z.coerce.number("O campo 'fighter_id' é obrigatório e deve ser um número inteiro").int("O 'fighter_id' deve ser um número inteiro"),
    });

    try {
        const { fighter_id } = paramsSchema.parse(req.params);
        const player = await db('player')
            .where({ fighter_id: fighter_id })
            .first();
        if (player) {
            return res.status(200).json(player);
        } else {
            return res.status(404).json({ error: "Jogador não encontrado." });
        }
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar jogador." });
    }   
}

export async function getAllPlayers(req: Request, res: Response) {
    try {
        const players = await db('player')
            .whereNull('deleted_at')
            .select('*');
        return res.status(200).json(players);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar jogadores." });
    }
}

export async function updatePlayer(req: Request, res: Response) {
    const paramsSchema = z.object({
        fighter_id: z.coerce.number("O campo 'fighter_id' é obrigatório e deve ser um número inteiro").int("O 'fighter_id' deve ser um número inteiro"),
    });

    const bodySchema = z.object({
        name: z.string().optional(),
        cfn: z.string().optional()
    });

    const trx = await db.transaction();
    try {
        const { fighter_id } = paramsSchema.parse(req.params);
        const { name, cfn } = bodySchema.parse(req.body);
        const updated = await trx('player')
            .where({ fighter_id: fighter_id })
            .update({ name, cfn })
            .returning(['name', 'fighter_id', 'cfn']);

        await trx.commit();
        if (updated.length) {
            return res.status(200).json(updated[0]);
        } else {
            return res.status(404).json({ error: "Jogador não encontrado." });
        }
    } catch (err) {
        await trx.rollback();
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro ao atualizar jogador." });
    }
}

export async function deletePlayer(req: Request, res: Response) {
    const paramsSchema = z.object({
        fighter_id: z.coerce.number("O campo 'fighter_id' é obrigatório e deve ser um número inteiro").int("O 'fighter_id' deve ser um número inteiro"),
    });
    const trx = await db.transaction();
    try {
        const { fighter_id } = paramsSchema.parse(req.params);
        await trx('classification').where({ player_id: fighter_id }).del();
        const deleted = await trx('player').where({ fighter_id: fighter_id }).update({ deleted_at: trx.fn.now() });
        await trx.commit();
        if (deleted) {
            return res.status(200).json({ message: "Jogador deletado com sucesso." });
        } else {
            return res.status(404).json({ error: "Jogador não encontrado." });
        }
    } catch (err) {
        await trx.rollback();
        console.error(err);
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err });
        }
        return res.status(500).json({ error: "Erro ao deletar jogador." });
    }
}