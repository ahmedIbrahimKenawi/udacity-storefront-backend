import * as jwt from "jsonwebtoken";
import { User } from "../../models/users";
import { TOKEN_SECRET } from "../../config";
import { Request } from "express";

function generateToken(user: User): string {
  // make sure to NOT include password in token
  if (user.password) {
    delete user.password;
  }
  return jwt.sign(user, TOKEN_SECRET as string, {
    noTimestamp: true,
  });
}

function parseToken(token: string): jwt.JwtPayload {
  const payload = jwt.verify(token, TOKEN_SECRET as string);
  return payload as jwt.JwtPayload;
}

function getToken(req: Request): string {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(" ")[1];
  return token as string;
}
export { generateToken, parseToken, getToken };
