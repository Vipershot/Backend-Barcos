import { NextFunction, Request, Response } from "express"
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export function errorHandler (err:unknown, req:Request, res:Response, next:NextFunction) {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
  } else if(err instanceof UnauthorizedError) {
      res.status(401).json({ error: err.message });
  } else {
      res.status(500).json({ error: (<Error>err).message });
  }
}