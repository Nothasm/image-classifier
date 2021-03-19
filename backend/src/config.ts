import dotenv from "dotenv";

dotenv.config();

export const env: {
    [key: string]: any
} = {
    projectArn: process.env.PROJECT_ARN,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    bucket: process.env.BUCKET,
    mongoUri: process.env.MONGO_URI,
    port: process.env.SERVER_PORT,
    region: process.env.AWS_REGION
};

for (const key in env) {
    if(!env[key]) throw new Error(`${key} variable not set`);
}