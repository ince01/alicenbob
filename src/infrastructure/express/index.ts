import express from "express";
import router from "./router";

const app = express();

app.use(express.json());

// const errorRequestHandler: ErrorRequestHandler = (error, _req, res) => {
//   res.status(500).json({
//     error: error.message,
//   });
// };

// app.use(errorRequestHandler);

app.use(router);

export default app;
