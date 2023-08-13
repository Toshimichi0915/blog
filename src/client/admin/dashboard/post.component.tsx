import { memo, useCallback, useState } from "react"
import { DashboardPostTableRow, DashboardTable } from "@/client/admin/dashboard/table.component"
import { usePosts } from "@/client/admin/dashboard/post.hook"
import { PostCreateDialog } from "@/client/admin/dashboard/post-create.component"

export const DashboardPosts = memo(function DashboardPosts() {
  const { create, posts } = usePosts()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const openCreateDialog = useCallback(() => setCreateDialogOpen(true), [])
  const closeCreateDialog = useCallback(() => setCreateDialogOpen(false), [])

  return (
    <>
      <PostCreateDialog open={createDialogOpen} onClose={closeCreateDialog} onCreate={create} />
      <DashboardTable title="Manage Posts" onCreate={openCreateDialog}>
        {posts.map((post) => {
          return <DashboardPostTableRow key={post.id} post={post} />
        })}
      </DashboardTable>
    </>
  )
})
