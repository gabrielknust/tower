import { Router } from "express";
import {playerController} from "../controller/player.controller";

const router = Router();

router.post("/", playerController.createPlayer);

export default router;
