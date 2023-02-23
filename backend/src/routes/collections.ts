import express from "express";
import * as CollectionsController from "../controllers/collections";

const router = express.Router();

router.get("/", CollectionsController.getCollections);
router.get("/:collectionId", CollectionsController.getCollections);

export default router;