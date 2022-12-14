import inWhitelist from "./in-whitelist";
type ICallback = (error: null | Error, options?: boolean) => any;

const origin = (origin: string, callback: ICallback) => {
  // allow requests with no origin or from dev environment
  const isDev = process.env.NODE_ENV !== "production";
  if (!origin || isDev) {
    return callback(null, true);
  }

  // allow requests from app URLs
  if (
    origin === process.env.APP_BASE_URL ||
    origin === process.env.CLIENT_BASE_URL
  ) {
    return callback(null, true);
  }

  // allow request from whitelist
  if (inWhitelist(origin)) {
    return callback(null, true);
  }

  // deny any other request
  callback(new Error("Not allowed by CORS"));
};

export default origin;
