import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _req, res) => {
  res.status(500).json({
    error: error.message ?? "Internal Server Error",
  });
};
