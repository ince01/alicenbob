import { ErrorRequestHandler } from "express";
import { logger } from "infrastructure/pino";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  logger.error(error, "Error in request");

  res.status(500).json({
    message: "Internal Server Error",
  });
};
