import express from "express";
import helmet from "helmet";
import router from "#src/router";
import setupCors from "#src/cors/setup-cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// global path for project root
global.rootProjectLocation = __dirname;

app.set("views", join(__dirname, "/src/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(setupCors());

// route everything
app.use("/", router);

export default app;
