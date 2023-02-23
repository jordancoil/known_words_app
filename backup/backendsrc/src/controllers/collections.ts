import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import CollectionModel from "../models/collection";
import { assertIsDefined } from "../util/assertIsDefined";

export const getCollections: RequestHandler = async (req, res, next) => {
    try {
        const collections = await CollectionModel.find().exec();
        res.status(200).json(collections);
    } catch (error) {
        next(error);
    }
}

export const getCollection: RequestHandler = async (req, res, next) => {
    const collectionId = req.params.noteId;
    const authUserId = req.session.userId;

    try {
        assertIsDefined(authUserId);

        if (!mongoose.isValidObjectId(collectionId))
            throw createHttpError(400, "Invalid Note Id");

        const collection = await CollectionModel.findById(collectionId).exec();

        if (!collection) throw createHttpError(404, "Note not found");

        // if (!collection.userId.equals(authUserId)) throw createHttpError(401, "You cannot access this note")

        res.status(200).json(collection);
    } catch (error) {
        next(error);
    }
}