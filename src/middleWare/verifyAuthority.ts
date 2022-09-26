import { Request, Response, NextFunction } from "express";
import { TOKEN_SECRET } from "../config";
import * as jwt from "jsonwebtoken";

export function verifyAuthority(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // get the access token from the header
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(400).send("NO token");
      return;
    }

    try {
      const token = authorizationHeader.split(" ")[1];
      const payload = jwt.verify(token as string, TOKEN_SECRET as string);
      const role = (payload as jwt.JwtPayload).role;

      if (!roles.includes(role)) {
        res.status(400).send({ res: "Access Denied" });
        return;
      }

      next();
    } catch (error) {
      res.status(400).send("Invalid token");
    }
  };
}
