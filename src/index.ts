import "dotenv/config";

import http from "http";
import express from "infrastructure/express";

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(express);

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
