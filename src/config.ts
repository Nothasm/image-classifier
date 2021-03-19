import dotenv from "dotenv";

dotenv.config();

export const projectArn: string = process.env.PROJECT_ARN || "";
export const accessKeyId = process.env.ACCESS_KEY_ID;
export const secretAccessKey = process.env.SECRET_ACCESS_KEY;
export const bucket = process.env.BUCKET || "";
export const mongoUri = process.env.MONGO_URI || "";
export const port = process.env.SERVER_PORT;

