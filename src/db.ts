import mongoose from "mongoose";
import { mongoUri } from "./config";

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch((e: any) => console.log(e) );

export { mongoose };