import { Router } from "express";
import {createClassification,deleteClassification,getAllClassifications,getClassificationById,updateClassification} from "../controller/classification.controller";

const router = Router();

router.post("/", createClassification);
router.get("/:id", getClassificationById);
router.get("/", getAllClassifications);
router.put("/:id", updateClassification);
router.delete("/:id", deleteClassification);

export default router;