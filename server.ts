import express from "express";
import helmet from "helmet";
import router from "#src/router";
import setupCors from "#src/cors/setup-cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(setupCors());

// route everything
app.use("/", router);

export default app;
