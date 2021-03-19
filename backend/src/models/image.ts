import { String } from "aws-sdk/clients/batch";
import mongoose, { Schema } from "mongoose";

export interface IImage extends mongoose.Document {
    fileName: string
    md5: string
    analisys: String
}

const imageSchema = new Schema({
    fileName: String,
    md5: String,
    category: String
});

export const image = mongoose.model<IImage>("Image", imageSchema);
