import { PostCreateInput } from "@/common/db.type"
import { ChangeEvent, memo, useCallback, useState } from "react"
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { css } from "@emotion/react"

export const PostCreateDialog = memo(function PostCreateDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean
  onClose(): void
  onCreate(data: PostCreateInput): void
}) {
  const [data, setData] = useState<PostCreateInput>({
    title: "",
    slug: "",
    content: "null",
  })

  const setTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setData((data) => ({ ...data, title: e.target.value })),
    [setData]
  )

  const setSlug = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setData((data) => ({ ...data, slug: e.target.value })),
    [setData]
  )

  const createAndClose = useCallback(() => {
    onCreate(data)
    onClose()
  }, [data, onClose, onCreate])

  return (
    <Dialog open={open} onClose={onClose} css={categoryCreateDialogStyles}>
      <DialogTitle>Create a new post</DialogTitle>
      <DialogContent className="PostCreateDialog-Content">
        <TextField value={data.title} onChange={setTitle} label="title" margin="dense" />
        <TextField value={data.slug} onChange={setSlug} label="slug" margin="dense" />
        <Button onClick={createAndClose}>Create</Button>
      </DialogContent>
    </Dialog>
  )
})

function categoryCreateDialogStyles() {
  return css`
    & .PostCreateDialog-Content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `
}
