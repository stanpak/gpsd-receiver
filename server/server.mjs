import express from "express";
import cors from "cors";
import nocache from "nocache";
import { registerApi } from "./api.mjs";
import {gpsdListener} from "./GpsdListener.mjs";

gpsdListener.initialize();

const app = express();
const port = 4000;

app.use(cors());
app.use(nocache());

registerApi(app);

app.listen(port, () => {
    console.log(`gpsd-receiver service listening on port ${port}`)
});

