import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";

import ActivityController from './controllers/activity-controller.js';

// CONSTANTS
const ENV = Deno.env.toObject();
const HOST = ENV.HOST || '127.0.0.1';
const PORT = ENV.PORT || 8080;

const app = new Application();
const router = new Router();


// LOG CONFIGURATION
await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("DEBUG"),
        file: new log.handlers.FileHandler("INFO", { filename: "./log.txt", formatter: "{levelname} - {msg}"}) // TODO: check why it is not writing in the file.
    },
    loggers: {
        default: {
            level: "DEBUG",
            handlers: ["console", "file"]
        }
    }
});

let logger = log.getLogger();

logger.debug("probandoooooo");
logger.info("probando infoooooo.");

// ROUTES DEFINITION
router
.get("/", (context) => ActivityController.hello(context));


// ADDING DEPENDENCIES
app.use(router.routes());
app.use(router.allowedMethods());


// LAUNCHING THE APP
await app.listen({host: HOST, port: PORT});