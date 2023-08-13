import { Post, PostCreateInput, PostUpdateInput } from "@/common/db.type"
import { InitialDataContext } from "@/client/admin/dashboard/initial-data.store"
import { useContext, useMemo } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export interface PostEdit {
  update(data: PostUpdateInput): void

  delete(): void
}

export function usePostEdit(id: string) {
  const queryClient = useQueryClient()

  const { mutate: update } = useMutation(
    async (data: PostUpdateInput) => {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Could not update post")
      return (await response.json()) as Post
    },
    {
      mutationKey: ["posts", id],
      async onSuccess() {
        await queryClient.invalidateQueries(["posts"])
      },
    }
  )

  const { mutate: del } = useMutation(
    async () => {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Could not delete post")
      return (await response.json()) as Post
    },
    {
      mutationKey: ["posts", id],
      async onSuccess() {
        await queryClient.invalidateQueries(["posts"])
      },
    }
  )

  return useMemo(
    () => ({
      update,
      delete: del,
    }),
    [del, update]
  )
}

export interface PostsEdit {
  create(data: PostCreateInput): void

  posts: Post[]
}

export function usePosts(): PostsEdit {
  const queryClient = useQueryClient()
  const { posts } = useContext(InitialDataContext)

  const { data } = useQuery(
    ["posts"],
    async () => {
      const response = await fetch("/api/admin//posts")
      if (!response.ok) throw new Error("Could not fetch posts")

      return (await response.json()) as Post[]
    },
    {
      initialData: posts,
    }
  )

  const { mutate } = useMutation(
    async (data: PostCreateInput) => {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Could not create post")
      return (await response.json()) as Post
    },
    {
      mutationKey: ["posts"],
      async onSuccess() {
        await queryClient.invalidateQueries(["posts"])
      },
    }
  )

  return useMemo(
    () => ({
      create: mutate,
      posts: data,
    }),
    [data, mutate]
  )
}
