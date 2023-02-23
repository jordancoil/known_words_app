import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { ObjectId } from "mongodb";
import SubtitleModel from "../models/subtitle";
import { assertIsDefined } from "../util/assertIsDefined";

export const getAllSubtitlesForMedia: RequestHandler = async (req, res, next) => {
    const mediaId = req.params.mediaId;
    console.log(req.params)

    try {
        assertIsDefined(mediaId);

        // TODO get all available media, not just for single user
        const notes = await SubtitleModel.find({mediaId: mediaId}).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

interface CreateSubtitleBody {
    text?: string,
    timing?: string,
    mediaId?: string,
}

export const createSubtitle: RequestHandler<unknown, unknown, CreateSubtitleBody, unknown> = async (req, res, next) => {
    const text = req.body.text
    const timing = req.body.timing
    const mediaId = new ObjectId(req.body.mediaId);

    try {
        assertIsDefined(mediaId);

        if (!text) throw createHttpError(400, "Subtitle must have text");

        const newSubtitle = await SubtitleModel.create({
            text: text,
            timing: timing,
            mediaId: mediaId,
        });

        res.status(201).json(newSubtitle);
    } catch (error) {
        next(error);
    }
};