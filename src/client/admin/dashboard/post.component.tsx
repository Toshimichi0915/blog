import { memo, useCallback, useState } from "react"
import { DashboardPostTableRow, DashboardTable } from "@/client/admin/dashboard/table.component"
import { PostCreateDialog } from "@/client/admin/dashboard/post-create.component"
import { useCreatePost, usePosts } from "@/client/admin/dashboard/post.hook"

export const DashboardPosts = memo(function DashboardPosts() {
  const { data: posts } = usePosts()
  const { mutate: createPost } = useCreatePost()

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const openCreateDialog = useCallback(() => setCreateDialogOpen(true), [])
  const closeCreateDialog = useCallback(() => setCreateDialogOpen(false), [])

  return (
    <>
      <PostCreateDialog open={createDialogOpen} onClose={closeCreateDialog} onCreate={createPost} />
      <DashboardTable title="Manage Posts" onCreate={openCreateDialog}>
        {posts.map((post) => {
          return <DashboardPostTableRow key={post.id} post={post} />
        })}
      </DashboardTable>
    </>
  )
})
