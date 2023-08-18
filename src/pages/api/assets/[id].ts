import { NextApiRequest, NextApiResponse } from "next"
import { downloadFile } from "@/server/asset.util"
import { prisma } from "@/server/db.util"
import { middleware, withMethods } from "next-pipe"
import { withQuery } from "@/server/middleware.util"
import { Readable } from "stream"

export default middleware<NextApiRequest, NextApiResponse>()
  .pipe(withQuery("id"))
  .pipe(
    withMethods(({ get }) => {
      get().pipe(async (req, res, next, id) => {
        const [image, binary] = await Promise.all([
          prisma.imageAsset.findUnique({
            where: { id },
          }),
          prisma.binaryAsset.findUnique({
            where: { id },
          }),
        ])

        const asset = image ?? binary
        if (!asset) {
          res.status(404).json({ message: "Not Found" })
          return
        }

        let reader: Readable
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
