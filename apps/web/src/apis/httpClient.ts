import axios from "axios";
import { context, propagation } from "@opentelemetry/api";

export const httpClient = axios.create({
  baseURL: "http://localhost:3001",
});

httpClient.interceptors.request.use(config => {
  propagation.inject(context.active(), config.headers);
  return config;
});
