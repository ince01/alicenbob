import express from "express";
import compression from "compression";
import router from "./router";
import { errorHandler } from "./middlewares";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(compression());

app.use(router);

app.use(errorHandler);

export default app;
