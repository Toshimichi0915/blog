import { memo, ReactNode, useCallback, useState } from "react"
import { Theme } from "@mui/material"
import { css } from "@emotion/react"
import { ConfirmDialog } from "@/client/common/confirm.component"
import { Category, Post } from "@/common/db.type"
import { useCategoryEdit } from "@/client/admin/dashboard/category.hook"
import { CategoryEditDialog } from "@/client/admin/dashboard/category-edit.component"
import AddIcon from "@mui/icons-material/Add"
import { usePostEdit } from "@/client/admin/dashboard/post.hook"
import Link from "next/link"

export const DashboardPostTableRow = memo(function DashboardPostTableRow({ post }: { post: Post }) {
  const { delete: del } = usePostEdit(post.id)

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const openConfirmDialog = useCallback(() => setConfirmDialogOpen(true), [])
  const closeConfirmDialog = useCallback(() => setConfirmDialogOpen(false), [])

  return (
    <>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        action={`delete ${post.title}`}
        onExecute={del}
      />
      <div css={dashboardTableRowStyles}>
        <p>{post.title}</p>
        <div>
          <Link className="DashboardTableRow-Button" href={`/admin/posts/${post.id}`}>
            Edit
          </Link>
          <button className="DashboardTableRow-Button" onClick={openConfirmDialog}>
            Delete
          </button>
        </div>
      </div>
    </>
  )
})

export const DashboardCategoryTableRow = memo(function DashboardCategoryTableRow({ category }: { category: Category }) {
  const { update, delete: del } = useCategoryEdit(category.id)

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const openEditDialog = useCallback(() => setEditDialogOpen(true), [])
  const closeEditDialog = useCallback(() => setEditDialogOpen(false), [])

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const openConfirmDialog = useCallback(() => setConfirmDialogOpen(true), [])
  const closeConfirmDialog = useCallback(() => setConfirmDialogOpen(false), [])

  return (
    <>
      <CategoryEditDialog open={editDialogOpen} onClose={closeEditDialog} onUpdate={update} category={category} />
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        action={`delete ${category.name}`}
        onExecute={del}
      />
      <div css={dashboardTableRowStyles}>
        <p>{category.name}</p>
        <div>
          <button className="DashboardTableRow-Button" onClick={openEditDialog}>
            Edit
          </button>
          <button className="DashboardTableRow-Button" onClick={openConfirmDialog}>
            Delete
          </button>
        </div>
      </div>
    </>
  )
})

export const DashboardTable = memo(function DashboardTable({
  title,
  children,
  onCreate,
}: {
  title: string
  children: ReactNode[]
  onCreate(): void
}) {
  return (
    <section css={dashboardTableStyles}>
      <h2 className="DashboardTable-Title">{title}</h2>
      <div className="DashboardTable-CreateButtonContainer">
        <button onClick={onCreate} className="DashboardTable-CreateButton">
          <AddIcon />
          Add New
        </button>
      </div>
      <div className="DashboardTable-Items">{children}</div>
    </section>
  )
})

function dashboardTableRowStyles(theme: Theme) {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${theme.palette.divider};

    & .DashboardTableRow-Button {
      border: none;
      background-color: transparent;
      color: ${theme.palette.primary.main};
      text-decoration: none;
      font-size: ${theme.typography.body2.fontSize};
      padding: 5px 10px;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  `
}

function dashboardTableStyles(theme: Theme) {
  return css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid ${theme.palette.primary.main};
    border-radius: 3px;

    & .DashboardTable-Title {
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      font-weight: normal;
      margin: 0;
      padding: 10px 20px;
    }

    & .DashboardTable-CreateButtonContainer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background-color: ${theme.palette.primary.main};
      padding-right: 10px;
    }

    & .DashboardTable-CreateButton {
      display: flex;
      align-items: center;

      border: none;
      background-color: ${theme.palette.primary.contrastText};
      color: ${theme.palette.primary.main};
      padding: 5px 20px;
      border-radius: 3px;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    & .DashboardTable-Items {
      grid-column: 1 / 3;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px 20px;
    }
  `
}
