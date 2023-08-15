import { middleware, withMethods, withValidatedBody } from "next-pipe"
import { NextApiRequest, NextApiResponse } from "next"
import { deleteCategory, getCategoryById, updateCategory } from "@/server/db.mapper"
import { CategoryUpdateSchema } from "@/common/db.type"
import { withQuery } from "@/server/middleware.util"

export default middleware<NextApiRequest, NextApiResponse>()
  .pipe(withQuery("id"))
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
