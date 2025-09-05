import { Router } from "express";
import {createTower,deleteTower,getAllTowers,getTowerById,updateTower} from "../controller/tower.controller";

const router = Router();

router.post("/", createTower);
router.get("/:tower_id", getTowerById);
router.get("/", getAllTowers);
router.put("/:tower_id", updateTower);
router.delete("/:tower_id", deleteTower);

export default router;