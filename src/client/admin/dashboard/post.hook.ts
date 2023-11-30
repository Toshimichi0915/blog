import { createPost, getPosts, updatePost } from "@/client/admin/dashboard/post.util"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useInitialData } from "@/client/admin/dashboard/initial-data.store"
import { Post, PostCreateInput, PostUpdateInput } from "@/common/db.type"

export function usePosts() {
  const { posts } = useInitialData()

  return useQuery({
    queryKey: ["posts"],
    async queryFn() {
      return await getPosts()
    },
    initialData: posts,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    async mutationFn(data: PostCreateInput) {
      return await createPost(data)
    },
    async onMutate() {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    async mutationFn({ id, data }: { id: string; data: PostUpdateInput }) {
      return await updatePost(id, data)
    },

    onMutate(data) {
      queryClient.setQueryData(["posts"], (old: Post[] | undefined) => {
        if (!old) return old
        const index = old.findIndex((c) => c.id === data.id)
        if (index === -1) return old
        return [...old.slice(0, index), data, ...old.slice(index + 1)]
      })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    async mutationFn(id: string) {
      return await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      })
    },
    onMutate(id) {
      queryClient.setQueryData(["posts"], (old: Post[] | undefined) => {
        if (!old) return old
        const index = old.findIndex((c) => c.id === id)
        if (index === -1) return old
        return [...old.slice(0, index), ...old.slice(index + 1)]
      })
    },
  })
}
