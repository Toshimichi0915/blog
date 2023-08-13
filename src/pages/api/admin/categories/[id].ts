import { Middleware, middleware, withMethods, withValidatedBody } from "next-pipe"
import { NextApiRequest, NextApiResponse } from "next"
import { deleteCategory, getCategoryById, updateCategory } from "@/server/db.mapper"
import { CategoryUpdateSchema } from "@/common/db.type"

function withCategoryId(): Middleware<NextApiRequest, NextApiResponse, [], [string]> {
  return async (req, res, next) => {
    const { id } = req.query
    if (typeof id !== "string") {
      res.status(400).json({ error: "id must be a string" })
      return
    }

    await next(id)
  }
}

export default middleware<NextApiRequest, NextApiResponse>()
  .pipe(withCategoryId())
  .pipe(
    withMethods(({ get, put, del }) => {
      get().pipe(async (req, res, next, id) => {
        res.json(getCategoryById(id))
      })

      put()
        .pipe(withValidatedBody(CategoryUpdateSchema))
        .pipe(async (req, res, next, id, body) => {
          res.json(updateCategory(id, body))
        })

      del().pipe(async (req, res, next, id) => {
        res.json(deleteCategory(id))
      })
    })
  )
