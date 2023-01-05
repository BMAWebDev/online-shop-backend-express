import { IDecodedToken } from "#src/types";

declare global {
  namespace Express {
    export interface Request {
      user?: IDecodedToken;
    }
  }
  var rootProjectLocation: string;
}
