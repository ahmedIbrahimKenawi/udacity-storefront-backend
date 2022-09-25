import { Request, Response, NextFunction } from "express";

export function verifyAuthority(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.body.token.role;
    if (roles.includes(role)) {
      next();
    } else {
      res.status(400).send({ res: "Access Denied" });
    }
  };
}
