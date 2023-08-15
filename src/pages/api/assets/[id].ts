import { NextApiRequest, NextApiResponse } from "next"
import { downloadFile } from "@/server/asset.util"
import { prisma } from "@/server/db.util"
import { middleware, withMethods } from "next-pipe"
import { withQuery } from "@/server/middleware.util"

export default middleware<NextApiRequest, NextApiResponse>()
  .pipe(withQuery("id"))
  .pipe(
    withMethods(({ get }) => {
      get().pipe(async (req, res, next, id) => {
        const asset = await prisma.asset.findUnique({
          where: { id },
        })

        if (!asset) {
          res.status(404).json({ message: "Not Found" })
          return
        }

        let reader
        try {
          reader = await downloadFile(asset.key)
        } catch (e) {
          res.status(404).json({ message: "Not Found" })
          return
        }

        res.setHeader("Content-Type", asset.mimeType)
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable")
        reader.pipe(res)
      })
    })
  )
