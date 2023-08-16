import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { Bucket } from "sst/node/bucket"
import { Readable } from "stream"

const s3 = new S3Client({})

export function readAll(readable: Readable, maxSize?: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    let size = 0
    const buffers: Buffer[] = []

    readable.on("readable", () => {
      let chunk
      while ((chunk = readable.read())) {
        buffers.push(chunk)
        size += chunk.length
        if (maxSize && size > maxSize) {
          readable.destroy()
          reject(new Error(`File is too large. Max size: ${maxSize}`))
          return
        }
      }
    })
    readable.on("end", () => {
      resolve(Buffer.concat(buffers))
    })
    readable.on("error", (err) => {
      reject(err)
    })
  })
}

export async function uploadFile(ext: string, body: Buffer): Promise<string> {
  const date = new Date()
  const key = `assets/${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}/${crypto.randomUUID()}.${ext}`

  await s3.send(
    new PutObjectCommand({
      Key: key,
      Bucket: Bucket.assets.bucketName,
      Body: body,
    })
  )

  return key
}

export async function downloadFile(key: string): Promise<Readable> {
  const res = await s3.send(
    new GetObjectCommand({
      Key: key,
      Bucket: Bucket.assets.bucketName,
    })
  )

  const body = res.Body
  if (!body) throw new Error("Asset has been deleted")

  return body as Readable
}
