import { useMutation } from "@tanstack/react-query"
import { useMemo } from "react"
import { AssetType, AssetUploadType } from "@/client/common/asset.type"

export interface AssetUpload {
  upload(file: File): void
}

export function useAssetUpload<T extends AssetUploadType>(
  type: T,
  callback: (asset: AssetType<T>) => void
): AssetUpload {
  let endpoint: string
  if (type === "IMAGE") {
    endpoint = "/api/admin/images"
  } else if (type === "BINARY") {
    endpoint = "/api/admin/files"
  }

  const { mutate } = useMutation(
    async (file: File) => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          "File-Name": file.name,
        },
        body: file,
      })

      if (!response.ok) throw new Error("Failed to upload file")

      callback((await response.json()) as AssetType<T>)
    },
    {
      mutationKey: ["assets"],
    }
  )

  return useMemo(
    () => ({
      upload: mutate,
    }),
    [mutate]
  )
}
