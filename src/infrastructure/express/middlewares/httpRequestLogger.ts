import pinoHttp from "pino-http";
import { pinoLogger } from "infrastructure/pino";

export const httpRequestLogger = pinoHttp({
  logger: pinoLogger,
});
