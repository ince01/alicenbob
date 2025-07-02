import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
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

const traceExporter = new OTLPTraceExporter();

const nodeAutoInstrumentations = getNodeAutoInstrumentations({
  "@opentelemetry/instrumentation-http": {
    ignoreIncomingRequestHook: request => {
      // For CORS preflight requests, we don't want to trace them
      return request.method === "OPTIONS";
    },
  },
  "@opentelemetry/instrumentation-express": {
    enabled: true,
  },
});

const sdk = new NodeSDK({
  serviceName: SERVICE_NAME,
  resource,
  traceExporter,
  instrumentations: [nodeAutoInstrumentations],
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
