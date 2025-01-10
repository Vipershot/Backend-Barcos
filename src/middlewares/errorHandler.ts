import { NextFunction, Request, Response } from "express"

export function errorHandler (err:unknown, req:Request, res:Response, next:NextFunction) {
    console.log("inicio")
    if (res.headersSent) {
        console.log("first error")
      return next(err)
    }
    res.status(500)
    next()
  }