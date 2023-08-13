import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Category, CategoryCreateInput, CategoryUpdateInput } from "@/common/db.type"
import { useContext, useMemo } from "react"
import { InitialDataContext } from "@/client/admin/dashboard/initial-data.store"

export interface CategoryEdit {
  update(data: CategoryUpdateInput): void

  delete(): void
}

export function useCategoryEdit(id: string): CategoryEdit {
  const queryClient = useQueryClient()
  const { mutate: update } = useMutation(
    async (data: CategoryUpdateInput) => {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Could not update category")
      return (await response.json()) as Category
    },
    {
      mutationKey: ["categories", id],
      async onSuccess() {
        await queryClient.invalidateQueries(["categories"])
      },
    }
  )

  const { mutate: del } = useMutation(
    async () => {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Could not delete category")
      return (await response.json()) as Category
    },
    {
      mutationKey: ["categories", id],
      async onSuccess() {
        await queryClient.invalidateQueries(["categories"])
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

export interface CategoriesEdit {
  create(data: CategoryCreateInput): void

  categories: Category[]
}

export function useCategories(): CategoriesEdit {
  const queryClient = useQueryClient()
  const { categories } = useContext(InitialDataContext)

  const { data } = useQuery(
    ["categories"],
    async () => {
      const response = await fetch("/api/admin/categories")
      if (!response.ok) throw new Error("Could not fetch categories")

      return (await response.json()) as Category[]
    },
    {
      initialData: categories,
    }
  )

  const { mutate } = useMutation(
    async (data: CategoryCreateInput) => {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Could not create category")
      return (await response.json()) as Category
    },
    {
      mutationKey: ["categories"],
      async onSuccess() {
        await queryClient.invalidateQueries(["categories"])
      },
    }
  )

  return useMemo(
    () => ({
      create: mutate,
      categories: data,
    }),
    [data, mutate]
  )
}
