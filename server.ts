import express from "express";
import helmet from "helmet";
import router from "#src/router";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const corsConfig = {
  origin: "*",
};
app.use(cors(corsConfig));

// route everything
app.use("/", router);

export default app;
