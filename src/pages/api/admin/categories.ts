import { NextApiRequest, NextApiResponse } from "next"
import { createCategory, getCategories } from "@/server/db.mapper"
import { middleware, withMethods, withValidatedBody } from "next-pipe"
import { CategoryCreateSchema } from "@/common/db.type"

export default middleware<NextApiRequest, NextApiResponse>().pipe(
  withMethods(({ get, post }) => {
    get().pipe(async (req, res) => {
      res.json(await getCategories())
    })

    post()
      .pipe(withValidatedBody(CategoryCreateSchema))
      .pipe(async (req, res, next, body) => {
        res.json(createCategory(body))
      })
  })
)
