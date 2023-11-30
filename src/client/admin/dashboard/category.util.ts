import { Category, CategoryCreateInput, CategoryUpdateInput } from "@/common/db.type"

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`/api/admin/categories`)
  if (!response.ok) throw new Error(`Could not get categories`)

  return await response.json()
}

export async function createCategory(data: CategoryCreateInput): Promise<Category> {
  const respones = await fetch(`/api/admin/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!respones.ok) throw new Error(`Could not add category`)
  return await respones.json()
}

export async function updateCategory(id: string, data: CategoryUpdateInput): Promise<Category> {
  const response = await fetch(`/api/admin/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error(`Could not update category ${id}`)
  return await response.json()
}

export async function deleteCategory(id: string): Promise<Category> {
  const response = await fetch(`/api/admin/categories/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) throw new Error(`Could not delete category ${id}`)
  return await response.json()
}
