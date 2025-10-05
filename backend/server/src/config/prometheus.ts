import client from "prom-client";

// Enable default metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics();

// Custom counter for requests
export const requestCounter = new client.Counter({
  name: "node_requests_total",
  help: "Total number of requests",
  labelNames: ["method", "route", "status"], // added status
});

// Custom histogram for response duration
export const responseTimeHistogram = new client.Histogram({
  name: "node_response_time_seconds",
  help: "Response time in seconds",
  labelNames: ["method", "route", "status"], // added status
  buckets: [0.1, 0.5, 1, 2, 5],
});

export default client;
