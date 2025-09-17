import { Request, Response } from "express";
import { Classification } from "../model/Classification";
import { db } from "../../postgres/database";

export async function createClassification(req: Request, res: Response) {
    const { player_id, tower_id } = req.body;
    try {
        // Busca a maior posição atual para a torre
        const maxPositionResult = await db('classification')
            .where({ tower_id })
            .max('position as maxPosition')
            .first();
        const nextPosition = (maxPositionResult?.maxPosition || 0) + 1;

        const result = await db('classification')
            .insert({
                player_id,
                tower_id,
                position: nextPosition
            })
            .returning('*');
        res.status(201).json(result[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao inserir classificação." });
    }
}

export async function getAllClassifications(req: Request, res: Response) {
    try {
        const classifications = await db('classification')
            .join('player', 'classification.player_id', 'player.fighter_id')
            .join('tower', 'classification.tower_id', 'tower.id')
            .select('classification.*', 'player.name as player_name', 'tower.name as tower_name');
        return res.status(200).json(classifications);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar classificações." });
    }
}

export async function getClassificationById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "ID inválido." });
    }
    try {
        const classification = await db('classification')
            .join('player', 'classification.player_id', 'player.fighter_id')
            .join('tower', 'classification.tower_id', 'tower.id')
            .select('classification.*', 'player.name as player_name', 'tower.name as tower_name')
            .where('classification.id', id )
            .first();
        console.log('Fetched classification:', classification);
        if (classification) {
            return res.status(200).json(classification);
        } else {
            return res.status(404).json({ error: "Classificação não encontrada." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar classificação." });
    }
}

export async function updateClassification(req: Request, res: Response) {
    const { id } = req.params;
    const { player_id, tower_id, position } = req.body;
    try {
        const result = await db('classification')
            .where({ id: id })
            .update({
                player_id: player_id,
                tower_id: tower_id,
                position: position
            })
            .returning('*');
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ error: "Classificação não encontrada." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao atualizar classificação." });
    }
}

export async function deleteClassification(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await db('classification')
            .where({ id: id })
            .del();
        if (result) {
            return res.status(200).json({ message: "Classificação deletada com sucesso." });
        } else {
            return res.status(404).json({ error: "Classificação não encontrada." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao deletar classificação." });
    }
}