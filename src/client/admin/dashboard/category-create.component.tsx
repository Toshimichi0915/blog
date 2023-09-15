import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { CategoryCreateInput } from "@/common/db.type"
import { ChangeEvent, memo, useCallback, useState } from "react"
import { css } from "@emotion/react"

export const CategoryCreateDialog = memo(function CategoryCreateDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean
  onClose(): void
  onCreate(data: CategoryCreateInput): void
}) {
  const [data, setData] = useState<CategoryCreateInput>({ name: "" })
  const setName = useCallback((e: ChangeEvent<HTMLInputElement>) => setData({ name: e.target.value }), [setData])
  const createAndClose = useCallback(() => {
    onCreate(data)
    onClose()
  }, [data, onClose, onCreate])

  return (
    <Dialog open={open} onClose={onClose} css={categoryCreateDialogStyles}>
      <DialogTitle>Create a new category</DialogTitle>
      <DialogContent className="CategoryCreateDialog-Content">
        <TextField value={data.name} onChange={setName} label="name" margin="dense" />
        <Button onClick={createAndClose}>Create</Button>
      </DialogContent>
    </Dialog>
  )
})

function categoryCreateDialogStyles() {
  return css`
    & .CategoryCreateDialog-Content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `
}
