import { app } from "./app";
import { env } from "./config";

app.listen(env.port, () => {
    console.log(`Server listening on port: ${env.port}`);
});
