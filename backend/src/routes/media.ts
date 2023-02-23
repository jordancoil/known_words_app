import express from "express";
import * as MediaController from "../controllers/media";

const router = express.Router();

router.get("/:collectionId", MediaController.getAllMediaForCollection);
router.post("/", MediaController.createMedia);

export default router;