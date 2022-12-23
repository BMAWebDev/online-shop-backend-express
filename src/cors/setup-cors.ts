import origin from "./origin";
import cors from "cors";
import { CorsOptions } from "cors";

const setupCors = () => {
  return cors({
    origin,
    credentials: true,
    exposedHeaders: [
      "Content-Disposition",
      // add exposed headers here
    ],
  } as CorsOptions);
};

export default setupCors;
