import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategory, getCategories, updateCategory } from "@/client/admin/dashboard/category.util"
import { useInitialData } from "@/client/admin/dashboard/initial-data.store"
import { Prisma } from ".prisma/client"
import CategoryCreateInput = Prisma.CategoryCreateInput
import { Category, CategoryUpdateInput } from "@/common/db.type"

export function useCategories() {
  const { categories } = useInitialData()

  return useQuery({
    queryKey: ["categories"],
    async queryFn() {
      return await getCategories()
    },
    initialData: categories,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["create-category"],
    async mutationFn(data: CategoryCreateInput) {
      return await createCategory(data)
    },
    onMutate(data) {
      queryClient.setQueryData(["categories"], (old: Category[] | undefined) => {
        if (!old) return old
        return [...old, data]
      })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-category"],
    async mutationFn({ id, data }: { id: string; data: CategoryUpdateInput }) {
      return await updateCategory(id, data)
    },
    onMutate(data) {
      queryClient.setQueryData(["categories"], (old: Category[] | undefined) => {
        if (!old) return old
        const index = old.findIndex((c) => c.id === data.id)
        if (index === -1) return old
        return [...old.slice(0, index), data, ...old.slice(index + 1)]
      })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["delete-category"],
    async mutationFn(id: string) {
      return await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      })
    },
    onMutate(id) {
      queryClient.setQueryData(["categories"], (old: Category[] | undefined) => {
        if (!old) return old
        const index = old.findIndex((c) => c.id === id)
        if (index === -1) return old
        return [...old.slice(0, index), ...old.slice(index + 1)]
      })
    },
  })
}
