import { ChangeEvent, memo, PropsWithChildren, ReactNode, useCallback, useId } from "react"
import { Dialog, DialogContent, DialogTitle, Theme } from "@mui/material"
import { css } from "@emotion/react"
import { AssetType, AssetUploadType } from "@/client/common/asset.type"
import { uploadAsset } from "@/client/common/asset.util"

interface AssetDialogProps<T extends AssetUploadType> {
  type: T
  open: boolean

  onClose(): void

  onUpload: (asset: AssetType<T>) => void
}

export const AssetDialog = memo(function AssetDialog<T extends AssetUploadType>({
  type,
  open,
  onClose,
  onUpload,
}: PropsWithChildren<AssetDialogProps<T>>) {
  const fileId = useId()

  const uploadFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files || files.length === 0) return
      const asset = await uploadAsset(type, files[0])
      onUpload(asset)
    },
    [onUpload, type]
  )

  return (
    <Dialog open={open} onClose={onClose} css={imageDialogStyles}>
      <DialogTitle>Upload {type === "IMAGE" ? "an image" : "a file"}</DialogTitle>
      <DialogContent>
        <input type="file" onChange={uploadFile} className="AssetDialog-File" id={fileId} />
        <label htmlFor={fileId} className="AssetDialog-Label">
          Choose a file from your computer
        </label>
      </DialogContent>
    </Dialog>
  )
}) as <T extends AssetUploadType>(props: AssetDialogProps<T>) => ReactNode

function imageDialogStyles(theme: Theme) {
  return css`
    & .AssetDialog-File {
      display: none;
    }

    & .AssetDialog-Label {
      cursor: pointer;
      display: grid;
      place-items: center;
      padding: 20px 30px;
      border: 1px solid ${theme.palette.divider};
      border-radius: 3px;
      transition: border 0.2s ease-in-out;

      &:hover {
        border: 1px solid ${theme.palette.primary.main};
      }
    }
  `
}
