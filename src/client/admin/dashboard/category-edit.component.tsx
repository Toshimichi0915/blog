import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { Category, CategoryUpdateInput } from "@/common/db.type"
import { ChangeEvent, memo, useCallback, useState } from "react"
import { css } from "@emotion/react"

export const CategoryEditDialog = memo(function CategoryEditDialog({
  open,
  onClose,
  onUpdate,
  category,
}: {
  open: boolean
  onClose(): void
  onUpdate(data: CategoryUpdateInput): void
  category: Category
}) {
  const [data, setData] = useState<CategoryUpdateInput>({
    name: category.name,
  })
  const setName = useCallback((e: ChangeEvent<HTMLInputElement>) => setData({ name: e.target.value }), [setData])
  const updateAndClose = useCallback(() => {
    onUpdate(data)
    onClose()
  }, [data, onClose, onUpdate])

  return (
    <Dialog open={open} onClose={onClose} css={categoryEditDialogStyles}>
      <DialogTitle>Edit {category.name}</DialogTitle>
      <DialogContent className="CategoryDialog-Content">
        <TextField value={data.name} onChange={setName} label="name" margin="dense" />
        <Button onClick={updateAndClose}>Update</Button>
      </DialogContent>
    </Dialog>
  )
})

function categoryEditDialogStyles() {
  return css`
    & .CategoryDialog-Content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `
}
