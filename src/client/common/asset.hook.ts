import { useMutation } from "@tanstack/react-query"
import { Asset } from "@/common/db.type"
import { useMemo } from "react"

export interface AssetUpload {
  upload(file: File): void
}

export function useAssetUpload(callback: (asset: Asset) => void) {
  const { mutate } = useMutation(
    async (file: File) => {
      const response = await fetch("/api/admin/assets", {
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      })

      if (!response.ok) throw new Error("Failed to upload file")

      callback((await response.json()) as Asset)
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
