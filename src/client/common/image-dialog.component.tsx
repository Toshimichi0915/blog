import { ChangeEvent, memo, useCallback, useId } from "react"
import { useAssetUpload } from "@/client/common/asset.hook"
import { Dialog, DialogContent, DialogTitle, Theme } from "@mui/material"
import { Asset } from "@/common/db.type"
import { css } from "@emotion/react"

export const ImageDialog = memo(function ImageDialog({
  open,
  onClose,
  onUpload,
}: {
  open: boolean
  onClose(): void
  onUpload: (asset: Asset) => void
}) {
  const { upload } = useAssetUpload(onUpload)
  const fileId = useId()

  const uploadFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files || files.length === 0) return
      upload(files[0])
    },
    [upload]
  )

  return (
    <Dialog open={open} onClose={onClose} css={imageDialogStyles}>
      <DialogTitle>Upload an image</DialogTitle>
      <DialogContent>
        <input type="file" onChange={uploadFile} className="ImageDialog-File" id={fileId} />
        <label htmlFor={fileId} className="ImageDialog-Label">
          Choose a file
        </label>
      </DialogContent>
    </Dialog>
  )
})

function imageDialogStyles(theme: Theme) {
  return css`
    & .ImageDialog-File {
      display: none;
    }

    & .ImageDialog-Label {
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
