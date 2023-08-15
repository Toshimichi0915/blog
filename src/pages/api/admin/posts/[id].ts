import { middleware, withMethods, withValidatedBody } from "next-pipe"
import { NextApiRequest, NextApiResponse } from "next"
import { createPost, deletePost, getPostById, updatePost } from "@/server/db.mapper"
import { PostCreateSchema, PostUpdateSchema } from "@/common/db.type"
import { withQuery } from "@/server/middleware.util"

export default middleware<NextApiRequest, NextApiResponse>()
  .pipe(withQuery("id"))
  .pipe(
    withMethods(({ get, post, put, del }) => {
      get().pipe(async (req, res, next, id) => {
        res.json(getPostById(id))
      })

      post()
        .pipe(withValidatedBody(PostCreateSchema))
        .pipe(async (req, res, next, id, body) => {
          res.json(createPost(body))
        })

      put()
        .pipe(withValidatedBody(PostUpdateSchema))
        .pipe(async (req, res, next, id, body) => {
          res.json(updatePost(id, body))
        })

      del().pipe(async (req, res, next, id) => {
        res.json(deletePost(id))
      })
    })
  )
