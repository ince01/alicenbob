import { LoggerPort } from "ports/logger";
import pino from "pino";
import path from "path";
import { trace } from "@opentelemetry/api";
import { resource } from "infrastructure/opentelemetry";

export const logger: LoggerPort = pino({
  transport: {
    target: path.resolve(path.join(__dirname, "./opentelemetryTransport.js")),
    options: {
      resourceAttributes: resource.attributes,
    },
  },
  mixin(mergedObject) {
    const currentSpan = trace.getActiveSpan();
    const spanContext = currentSpan?.spanContext();

    return {
      ...mergedObject,
      spanContext,
    };
  },
});
