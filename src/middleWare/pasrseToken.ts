import { Request, Response, NextFunction } from "express";
import { TOKEN_SECRET } from "../config";
import * as jwt from "jsonwebtoken";

export function pasrseToken(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    try {
      const token = authorizationHeader.split(" ")[1];
      const payload = jwt.verify(token as string, TOKEN_SECRET as string);
      req.body.token = payload;
    } catch (error) {
      res.status(400).send("Invalid token");
    }
  } else {
    req.body.token = {
      role: "gest",
    };
  }
  next();
}
