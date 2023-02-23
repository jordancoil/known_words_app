import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import MediaModel from "../models/note";
import { assertIsDefined } from "../util/assertIsDefined";

export const getAllMedia: RequestHandler = async (req, res, next) => {
    const authUserId = req.session.userId;

    try {
        assertIsDefined(authUserId);

        // TODO get all available media, not just for single user
        const notes = await MediaModel.find({userId: authUserId}).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

export const getMedia: RequestHandler = async (req, res, next) => {
    const mediaId = req.params.noteId;
    const authUserId = req.session.userId;

    try {
        assertIsDefined(authUserId);

        if (!mongoose.isValidObjectId(mediaId))
            throw createHttpError(400, "Invalid Media Id");

        const note = await MediaModel.findById(mediaId).exec();

        if (!note) throw createHttpError(404, "Media not found");

        if (!note.userId.equals(authUserId)) throw createHttpError(401, "You cannot access this media")

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

