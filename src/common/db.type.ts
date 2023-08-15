import { z } from "zod"

export interface Category {
  id: string
  name: string
  createdAt: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  category?: Category | null
  createdAt: string
  publishedAt?: string | null
}

export const CategoryCreateSchema = z.object({
  name: z.string(),
})

export type CategoryCreateInput = z.input<typeof CategoryCreateSchema>
export type CategoryCreateOutput = z.output<typeof CategoryCreateSchema>

export const CategoryUpdateSchema = z.object({
  name: z.string().optional(),
})

export type CategoryUpdateInput = z.input<typeof CategoryUpdateSchema>
export type CategoryUpdateOutput = z.output<typeof CategoryUpdateSchema>

export const PostCreateSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  categoryId: z.string().optional(),
})

export type PostCreateInput = z.input<typeof PostCreateSchema>
export type PostCreateOutput = z.output<typeof PostCreateSchema>

export const PostUpdateSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  content: z.string().optional(),
  categoryId: z.string().optional(),
})

export type PostUpdateInput = z.input<typeof PostUpdateSchema>
export type PostUpdateOutput = z.output<typeof PostUpdateSchema>

export interface Asset {
  id: string
  url: string
  width: number
  height: number
}
