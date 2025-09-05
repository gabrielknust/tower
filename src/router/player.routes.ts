import { Router } from "express";
import {createPlayer,deletePlayer,getAllPlayers,getPlayerById,updatePlayer} from "../controller/player.controller";

const router = Router();

router.post("/", createPlayer);
router.get("/:fighter_id", getPlayerById);
router.get("/", getAllPlayers);
router.put("/:fighter_id", updatePlayer);
router.delete("/:fighter_id", deletePlayer);

export default router;