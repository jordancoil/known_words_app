import express from "express";
import * as SubtitleController from "../controllers/subtitles";

const router = express.Router();

router.get("/:mediaId", SubtitleController.getAllSubtitlesForMedia);
router.post("/", SubtitleController.createSubtitle);

export default router;