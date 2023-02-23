import express from "express";
import * as MediaController from "../controllers/media";

const router = express.Router();

router.get("/", MediaController.getAllMedia);
router.get("/:mediaId", MediaController.getMedia);
// router.post("/", MediaController.createMedia);
// router.patch("/:noteid", MediaController.updateMedia);
// router.delete("/:noteid", MediaController.deleteMedia);

export default router;