import build from "pino-abstract-transport";
import { LoggerProvider } from "@opentelemetry/sdk-logs";
import { context, trace } from "@opentelemetry/api";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import {
  ConsoleLogRecordExporter,
  SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";
import { resourceFromAttributes } from "@opentelemetry/resources";

export const DEFAULT_SEVERITY_MAP = {
  10: "TRACE", // TRACE
  20: "DEBUG", // DEBUG
  30: "INFO", // INFO
  40: "WARN", // WARN
  50: "ERROR", // ERROR
  60: "FATAL", // FATAL
};

export const DEFAULT_SEVERITY_NUMBER_MAP = {
  10: SeverityNumber.TRACE, // TRACE
  20: SeverityNumber.DEBUG, // DEBUG
  30: SeverityNumber.INFO, // INFO
  40: SeverityNumber.WARN, // WARN
  50: SeverityNumber.ERROR, // ERROR
  60: SeverityNumber.FATAL, // FATAL
};

export default async function ({ resourceAttributes }) {
  const resource = resourceFromAttributes(resourceAttributes);
  const loggerProvider = new LoggerProvider({
    processors: [new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())],
    resource,
  });

  logs.setGlobalLoggerProvider(loggerProvider);
  const logger = logs.getLogger("default", "latest");

  return build(async function (source) {
    for await (const object of source) {
      const { level, msg, spanContext, ...rest } = object;

      // time, pid, hostname,
      delete rest.time;
      delete rest.pid;
      delete rest.hostname;

      const ctx = trace.setSpanContext(context.active(), spanContext);

      const logRecord = {
        severityNumber: DEFAULT_SEVERITY_NUMBER_MAP[level],
        severityText: DEFAULT_SEVERITY_MAP[level],
        body: msg,
        attributes: { ...rest },
        context: ctx,
      };

      logger.emit(logRecord);
    }
  });
}
