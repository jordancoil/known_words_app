import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { ObjectId } from "mongodb";
import MediaModel from "../models/media";
import { assertIsDefined } from "../util/assertIsDefined";

export const getAllMediaForCollection: RequestHandler = async (req, res, next) => {
    const collectionId = req.params.collectionId;
    console.log(req.params)

    try {
        assertIsDefined(collectionId);

        const notes = await MediaModel.find({collectionId: collectionId}).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

interface CreateMediaBody {
    title?: string,
    description?: string,
    imgFile?: string,
    collectionId?: string,
}

export const createMedia: RequestHandler<unknown, unknown, CreateMediaBody, unknown> = async (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const imgFile = req.body.imgFile
    const collectionId = new ObjectId(req.body.collectionId);

    try {
        assertIsDefined(collectionId);

        if (!title) throw createHttpError(400, "Media must have a title");

        const newMedia = await MediaModel.create({
            title: title,
            description: description,
            imgFile: imgFile,
            collectionId: collectionId,
        });

        res.status(201).json(newMedia);
    } catch (error) {
        next(error);
    }
};