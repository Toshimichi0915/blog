import { NextApiRequest, NextApiResponse } from "next"
import { createPost, getPosts } from "@/server/db.mapper"
import { middleware, withMethods, withValidatedBody } from "next-pipe"
import { PostCreateSchema } from "@/common/db.type"

export default middleware<NextApiRequest, NextApiResponse>().pipe(
  withMethods(({ get, post }) => {
    get().pipe(async (req, res) => {
      res.json(await getPosts())
    })

    post()
      .pipe(withValidatedBody(PostCreateSchema))
      .pipe(async (req, res, next, body) => {
        res.json(await createPost(body))
      })
  })
)
