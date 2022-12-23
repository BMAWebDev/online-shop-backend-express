// Modules
import jwt from "jsonwebtoken";

// Types
import { Request, Response, NextFunction } from "express";

import { IDecodedToken } from "#src/types";

/**
 * Middleware for authentication
 * @see https://www.npmjs.com/package/express-jwt
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authorization.split(" ")[1];
  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET as string,
    (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          message: `Unauthorized ${err.name}`,
        });
      }

      const { id, email } = decodedToken as IDecodedToken;
      if (!id || !email) {
        return res.status(401).json({
          name: "Error",
          message: "Unauthorized Malformed JWT",
        });
      }

      // Make the decoded JWT payload available on the request object
      req.user = decodedToken as IDecodedToken;

      next();
    }
  );
};
