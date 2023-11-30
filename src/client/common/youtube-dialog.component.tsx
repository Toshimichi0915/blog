import { ChangeEvent, memo, useCallback, useState } from "react"
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { css } from "@emotion/react"

export const YoutubeDialog = memo(function YoutubeDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean
  onClose(): void
  onSave(url: string): void
}) {
  const [url, setUrl] = useState<string>("")
  const updateUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value), [setUrl])

  const save = useCallback(() => {
    onSave(url)
    onClose()
  }, [url, onSave, onClose])

  return (
    <Dialog open={open} onClose={onClose} css={youtubeDialogStyles}>
      <DialogTitle>Insert a Youtube video URL</DialogTitle>
      <DialogContent className="YoutubeDialog-Content">
        <TextField label="Youtube URL" value={url} onChange={updateUrl} margin="dense" />
        <Button onClick={save}>OK</Button>
      </DialogContent>
    </Dialog>
  )
})

function youtubeDialogStyles() {
  return css`
    & .YoutubeDialog-Content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `
}
