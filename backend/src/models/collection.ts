import { InferSchemaType, model, Schema } from "mongoose";

const collectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    imgFile: { type: String },
    type: { type: String, enum: ['tv', 'movie'] },
}, { timestamps: true });

type Collection = InferSchemaType<typeof collectionSchema>;

export default model<Collection>("Collection", collectionSchema);