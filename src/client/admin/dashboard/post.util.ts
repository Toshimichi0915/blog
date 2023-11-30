import { Post, PostCreateInput, PostUpdateInput } from "@/common/db.type"

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`/api/admin/posts`)
  if (!response.ok) throw new Error("Could not get posts")

  return await response.json()
}

export async function createPost(data: PostCreateInput): Promise<Post> {
  const response = await fetch(`/api/admin/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error("Could not create post")
  return await response.json()
}

export async function updatePost(id: string, data: PostUpdateInput): Promise<Post> {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error("Could not update post")
  return await response.json()
}

export async function deletePost(id: string): Promise<Post> {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) throw new Error("Could not delete post")
  return await response.json()
}
