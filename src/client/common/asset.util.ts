import { AssetType, AssetUploadType } from "@/client/common/asset.type"

export async function uploadAsset<T extends AssetUploadType>(type: T, file: File): Promise<AssetType<T>> {
  let endpoint: string
  if (type === "IMAGE") {
    endpoint = "/api/admin/images"
  } else if (type === "BINARY") {
    endpoint = "/api/admin/files"
  } else {
    throw new Error(`Unknown file type: ${type}`)
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": file.type,
      "X-File-Name": encodeURIComponent(file.name),
    },
    body: file,
  })

  if (!response.ok) throw new Error(`Failed to upload file`)
  return await response.json()
}
