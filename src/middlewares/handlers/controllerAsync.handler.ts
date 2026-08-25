import { NextFunction, Request, RequestHandler, Response } from "express";

export function controllerAsync(
  callback: (req: Request, res: Response) => Promise<unknown>,
): RequestHandler {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await callback(req, res);
    } catch (error) {
      next(error);
    }
  };
}
