import { InferSchemaType, model, Schema } from "mongoose";

const mediaSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    imgFile: { type: String },
    collectionId: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
}, { timestamps: true });

type Media = InferSchemaType<typeof mediaSchema>;

export default model<Media>("Media", mediaSchema);