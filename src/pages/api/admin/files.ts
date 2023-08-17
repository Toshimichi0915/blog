import { prisma } from "@/server/db.util"
import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "stream"
import { middleware, withMethods, withServerSession } from "next-pipe"
import { authOptions } from "@/server/auth.util"
import { readAll, uploadFile } from "@/server/asset.util"
import { BinaryAsset } from "@/common/db.type"

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
        const name = req.headers["file-name"]
        if (typeof name !== "string") {
          res.status(400).json({ error: "Bad Request" })
          return
        }

        const mimeType = req.headers["content-type"]
        if (typeof mimeType !== "string") {
          res.status(400).json({ error: "Bad Request" })
          return
        }

        let buffer
        try {
          buffer = await readAll(Readable.from(req))
        } catch (e) {
          res.status(400).json({ error: (e as Error).message })
          return
        }

        const key = await uploadFile(mimeType.split("/")[1], buffer)

        const data = await prisma.binaryAsset.create({
          data: {
            mimeType,
            key,
            name,
          },
        })

        res.json({
          id: data.id,
          url: `${baseUrl}/api/assets/${data.id}`,
          name: data.name,
        } satisfies BinaryAsset)
      })
    })
  )
