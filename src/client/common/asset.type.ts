import { BinaryAsset, ImageAsset } from "@/common/db.type"

export type AssetUploadType = "IMAGE" | "BINARY"

export type AssetType<T extends AssetUploadType> = T extends "IMAGE"
  ? ImageAsset
  : T extends "BINARY"
    ? BinaryAsset
    : never
