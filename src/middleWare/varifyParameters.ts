import { Request, Response, NextFunction } from "express";

export function varifyParameters(parameters: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const nonExistParams = parameters.filter((param) => {
      return !(param in req.body);
    });

    if (nonExistParams.length) {
      res
        .status(400)
        .send(`list of non Existed params: ${JSON.stringify(nonExistParams)}`);
    }

    next();
  };
}
