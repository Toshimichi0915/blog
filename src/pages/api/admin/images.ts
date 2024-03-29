import { prisma } from "@/server/db.util"
import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "stream"
import { middleware, withMethods, withServerSession } from "next-pipe"
import { authOptions } from "@/server/auth.util"
import { readAll, uploadFile } from "@/server/asset.util"
import { ImageAsset } from "@/common/db.type"
import sizeOf from "image-size"

const baseUrl = process.env.NEXTAUTH_URL

export const config = {
  api: {
    bodyParser: false,
  },
}

export default middleware<NextApiRequest, NextApiResponse>()
  .pipe(withServerSession(authOptions, true))
  .pipe(
    withMethods(({ post }) => {
      post().pipe(async (req, res) => {
        const mimeType = req.headers["content-type"]
        if (typeof mimeType !== "string") {
          res.status(400).json({ error: "Bad Request" })
          return
        }

        if (!mimeType.startsWith("image/")) {
          res.status(400).json({ error: `This Content-Type is not allowed.` })
          return
        }

        let buffer
        try {
          buffer = await readAll(Readable.from(req))
        } catch (e) {
          res.status(400).json({ error: (e as Error).message })
          return
        }

        const dimensions = sizeOf(buffer)
        if (!dimensions.width || !dimensions.height) {
          res.status(400).json({ error: "Invalid image" })
          return
        }

        const key = await uploadFile(mimeType.split("/")[1], buffer)

        const data = await prisma.imageAsset.create({
          data: {
            mimeType,
            key,
            width: dimensions.width,
            height: dimensions.height,
          },
        })

        res.json({
          id: data.id,
          url: `${baseUrl}/api/assets/${data.id}`,
          width: dimensions.width,
          height: dimensions.height,
        } satisfies ImageAsset)
      })
    })
  )
