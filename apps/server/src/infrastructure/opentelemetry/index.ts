import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  detectResources,
  envDetector,
  hostDetector,
  processDetector,
  resourceFromAttributes,
} from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { metrics } from "@opentelemetry/api";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { RuntimeNodeInstrumentation } from "@opentelemetry/instrumentation-runtime-node";

export const SERVICE_NAME = "alicenbob";
export const SERVICE_VERSION = "latest";

const defaultResource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: SERVICE_NAME,
  [ATTR_SERVICE_VERSION]: SERVICE_VERSION,
});

const resourceDetectors = [envDetector, processDetector, hostDetector];

export const resource = defaultResource.merge(
  detectResources({
    detectors: resourceDetectors,
  })
);

const spanProcessors =
  process.env.NODE_ENV === "production"
    ? [new BatchSpanProcessor(new OTLPTraceExporter())]
    : [new SimpleSpanProcessor(new ConsoleSpanExporter())];

const metricReader = new PeriodicExportingMetricReader({
  exporter: new OTLPMetricExporter(),
  // Default is 60000ms (60 seconds). Set to 10 seconds for demonstrative purposes only.
  exportIntervalMillis: 10000,
});

const meterProvider = new MeterProvider({
  resource: resource,
  readers: [metricReader],
});

metrics.setGlobalMeterProvider(meterProvider);

const sdk = new NodeSDK({
  serviceName: SERVICE_NAME,
  resource,
  spanProcessors,
  instrumentations: [
    new HttpInstrumentation({
      ignoreIncomingRequestHook: request => {
        // For CORS preflight requests, we don't want to trace them
        return request.method === "OPTIONS";
      },
    }),
    new ExpressInstrumentation(),
    new RuntimeNodeInstrumentation({
      monitoringPrecision: 5000,
    }),
  ],
});

sdk.start();

process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(
      () => console.log("SDK shut down successfully"),
      err => console.log("Error shutting down SDK", err)
    )
    .finally(() => process.exit(0));
});
