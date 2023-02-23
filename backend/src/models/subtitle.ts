import { InferSchemaType, model, Schema } from "mongoose";

const subtitleSchema = new Schema({
    text: { type: String, required: true },
    timing: { type: String },
    mediaId: { type: Schema.Types.ObjectId, ref: 'Media', required: true },
}, { timestamps: true });

type Subtitle = InferSchemaType<typeof subtitleSchema>;

export default model<Subtitle>("Subtitle", subtitleSchema);