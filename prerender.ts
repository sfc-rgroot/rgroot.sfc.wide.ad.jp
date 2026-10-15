import fs from "node:fs/promises";
const { render } = await import("./dist/server/entry-server.js");
const indexHtml = await fs.readFile("dist/static/index.html", "utf8");

const appHtml = await render();
const html = indexHtml.replace(`<!--outlet-->`, appHtml);
await fs.writeFile("./dist/static/index.html", html);
