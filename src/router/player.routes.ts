import { Router } from "express";
import { Player } from "../model/player";
import { db } from "../../postgres/database";

const router = Router();

router.post("/", async (req, res) => {
    let result;
    try{
        const { name,fighter_id,cfn } = req.body;
        const player = new Player(fighter_id,cfn,name);
        const query = 'INSERT INTO player (name,fighter_id,cfn) VALUES ($1, $2, $3) RETURNING *';
        const values = [player.name, player.fighterId,player.cfn];
        await db.connect();
        console.log(player);
        result = await db.query(query, values);
        console.log(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao inserir jogador." });
    } finally {
        const teste = await db.end();
        console.log(teste);
        res.status(201).json(result?.rows[0]);
    }
});

export default router;
