import { Router } from "express";
import {createMatch,deleteMatch,getAllMatches,getMatchById,updateMatch} from "../controller/match.controller";

const router = Router();

router.post("/", createMatch);
router.get("/:match_id", getMatchById);
router.get("/", getAllMatches);
router.put("/:match_id", updateMatch);
router.delete("/:match_id", deleteMatch);

export default router;