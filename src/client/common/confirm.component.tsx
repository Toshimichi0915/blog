import { Dialog, DialogContent, DialogTitle, Theme } from "@mui/material"
import { memo, useCallback } from "react"
import { css } from "@emotion/react"

export const ConfirmDialog = memo(function ConfirmDialog({
  open,
  onClose,
  action,
  onExecute,
}: {
  open: boolean
  onClose(): void
  action: string
  onExecute(): void
}) {
  const executeAndClose = useCallback(() => {
    onExecute()
    onClose()
  }, [onExecute, onClose])

  return (
    <Dialog open={open} onClose={onClose} css={confirmDialogStyles}>
      <DialogTitle>Are you sure you want to {action}?</DialogTitle>
      <DialogContent>
        <button className="ConfirmDialog-Button" onClick={executeAndClose}>
          YES
        </button>
      </DialogContent>
    </Dialog>
  )
})

function confirmDialogStyles(theme: Theme) {
  return css`
    & .ConfirmDialog-Button {
      border: none;
      border-radius: 3px;
      color: ${theme.palette.error.contrastText};
      background-color: ${theme.palette.error.main};
      padding: 10px;
      width: 100%;

      &:hover {
        cursor: pointer;
        background-color: ${theme.palette.error.light};
      }
    }
  `
}
