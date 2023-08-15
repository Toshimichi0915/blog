import { Middleware } from "next-pipe"
import { NextApiRequest, NextApiResponse } from "next"

export function withQuery(name: string): Middleware<NextApiRequest, NextApiResponse, [], [string]> {
  return async (req, res, next) => {
    const value = req.query[name]
    if (typeof value !== "string") {
      res.status(400).json({ message: "Bad Request" })
      return
    }

    await next(value)
  }
}
