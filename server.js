/**
 * Production startup file for cPanel "Setup Node.js App" (Phusion Passenger)
 * and any host that asks for a startup file instead of a start command.
 *
 * Run `npm run build` first. Passenger provides PORT; locally it defaults to 3000.
 * On hosts that accept a start command, `npm start` works too.
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("node:http");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`NextNTech.org ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start NextNTech.org:", err);
    process.exit(1);
  });
