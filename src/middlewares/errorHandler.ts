import { NextFunction, Request, Response } from "express"
import { NotFoundError } from "../errors/NotFoundError";

export function errorHandler (err:unknown, req:Request, res:Response, next:NextFunction) {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
  } else {
      res.status(500).json({ error: (<Error>err).message });
  }
}