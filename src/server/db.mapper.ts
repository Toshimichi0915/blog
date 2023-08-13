import { prisma } from "@/server/db.util"
import { Category as PrismaCategory, Post as PrismaPost } from "@prisma/client"
import {
  Category,
  CategoryCreateOutput,
  CategoryUpdateOutput,
  Post,
  PostCreateOutput,
  PostUpdateOutput,
} from "@/common/db.type"

function mapCategory(category: PrismaCategory): Category {
  return {
    id: category.id,
    name: category.name,
    createdAt: category.createdAt.toISOString(),
  }
}

function mapPost(post: PrismaPost & { category: PrismaCategory | null }): Post {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    category: post.category ? mapCategory(post.category) : null,
    createdAt: post.createdAt.toISOString(),
    publishedAt: post.publishedAt?.toISOString() ?? null,
  }
}

export async function getCategories(): Promise<Category[]> {
  const result = await prisma.category.findMany()
  return result.map(mapCategory)
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const result = await prisma.category.findUnique({ where: { id } })
  return result ? mapCategory(result) : undefined
}

export async function createCategory(data: CategoryCreateOutput): Promise<Category> {
  const result = await prisma.category.create({
    data: {
      name: data.name,
    },
  })
  return mapCategory(result)
}

export async function updateCategory(id: string, data: CategoryUpdateOutput): Promise<Category | undefined> {
  const result = await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
    },
  })
  return result ? mapCategory(result) : undefined
}

export async function deleteCategory(id: string): Promise<Category | undefined> {
  const result = await prisma.category.delete({ where: { id } })
  return result ? mapCategory(result) : undefined
}

export async function getPosts(): Promise<Post[]> {
  const result = await prisma.post.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return result.map(mapPost)
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const result = await prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
    },
  })

  return result ? mapPost(result) : undefined
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const result = await prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  })

  return result ? mapPost(result) : undefined
}

export async function createPost(data: PostCreateOutput): Promise<Post> {
  const result = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      categoryId: data.categoryId,
    },
    include: {
      category: true,
    },
  })

  return mapPost(result)
}

export async function updatePost(id: string, data: PostUpdateOutput): Promise<Post | undefined> {
  const result = await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      categoryId: data.categoryId,
    },
    include: {
      category: true,
    },
  })

  return result ? mapPost(result) : undefined
}

export async function deletePost(id: string): Promise<Post | undefined> {
  const result = await prisma.post.delete({
    where: { id },
    include: {
      category: true,
    },
  })

  return result ? mapPost(result) : undefined
}
