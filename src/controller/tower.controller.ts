import { Request, Response } from "express";
import { Tower } from "../model/Tower";
import { db } from "../../postgres/database";

export const createTower = async (req: Request, res: Response) => {
    const { name } = req.body;
    const tower = new Tower(0, name);
    try {
        const result = await db('tower')
            .insert({
                name: tower.name
            })
            .returning(['id', 'name']);

        res.status(201).json(result[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao inserir torre." });
    }
}

export const getAllTowers = async (req: Request, res: Response) => {
    try {
        const towers = await db('tower').select('*');
        return res.status(200).json(towers);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar torres." });
    }
}

export const getTowerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tower = await db('tower')
            .where({ id: id })
            .first();
        if (tower) {
            return res.status(200).json(tower);
        } else {
            return res.status(404).json({ error: "Torre não encontrada." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar torre." });
    }   
}

export const updateTower = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const result = await db('tower')
            .where({ id: id })
            .update({ name: name })
            .returning(['id', 'name']);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ error: "Torre não encontrada." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao atualizar torre." });
    }
}

export const deleteTower = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await db('tower')
            .where({ id: id })
            .del();

        if (result) {
            return res.status(200).json({ message: "Torre deletada com sucesso." });
        } else {
            return res.status(404).json({ error: "Torre não encontrada." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao deletar torre." });
    }
}