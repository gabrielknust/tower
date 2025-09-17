import { Router } from "express";
import {createTower,deleteTower,getAllTowers,getTowerById,updateTower} from "../controller/tower.controller";

const router = Router();

router.post("/", createTower);
router.get("/:id", getTowerById);
router.get("/", getAllTowers);
router.put("/:id", updateTower);
router.delete("/:id", deleteTower);

export default router;