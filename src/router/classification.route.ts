import { Router } from "express";
import {createClassification,deleteClassification,getAllClassifications,getClassificationById,updateClassification} from "../controller/classification.controller";

const router = Router();

router.post("/", createClassification);
router.get("/:classification_id", getClassificationById);
router.get("/", getAllClassifications);
router.put("/:classification_id", updateClassification);
router.delete("/:classification_id", deleteClassification);

export default router;