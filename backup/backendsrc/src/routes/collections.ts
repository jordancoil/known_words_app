import express from "express";
import * as CollectionsController from "../controllers/collections";

const router = express.Router();

router.get("/", CollectionsController.getCollections);
router.get("/:collectionId", CollectionsController.getCollections);
// router.post("/", NotesController.createNote);
// router.patch("/:noteId", NotesController.updateNote);
// router.delete("/:noteId", NotesController.deleteNote);

export default router;