import mongoose from "mongoose";
import { env } from "./config";

mongoose.Promise = global.Promise;
mongoose.connect(env.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch((e: any) => console.log(e) );

export { mongoose };