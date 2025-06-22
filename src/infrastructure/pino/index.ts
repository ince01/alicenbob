import { LoggerPort } from "ports/logger";
import pino from "pino";

export const pinoLogger: LoggerPort = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
