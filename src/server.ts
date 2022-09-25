import http from "node:http";
import app from "./app";
import { PORT, HOST } from "./config";

// Create a local server
const server = http.createServer(app);

server.listen(PORT, parseInt(HOST as string), () => {
  console.log(`\nSEVER RUNNING ON:\n${HOST}:${PORT}\n`);
});
