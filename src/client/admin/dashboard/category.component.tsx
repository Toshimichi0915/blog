import { memo, useCallback, useState } from "react"
import { DashboardCategoryTableRow, DashboardTable } from "@/client/admin/dashboard/table.component"

import { CategoryCreateDialog } from "@/client/admin/dashboard/category-create.component"
import { useCategories, useCreateCategory } from "@/client/admin/dashboard/category.hook"

export const DashboardCategories = memo(function CategoriesComponent() {
  const { data: categories } = useCategories()
  const { mutate: createCategory } = useCreateCategory()

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const openCreateDialog = useCallback(() => setCreateDialogOpen(true), [])
  const closeCreateDialog = useCallback(() => setCreateDialogOpen(false), [])

  return (
    <>
      <CategoryCreateDialog open={createDialogOpen} onClose={closeCreateDialog} onCreate={createCategory} />
      <DashboardTable title="Manage Categories" onCreate={openCreateDialog}>
        {categories.map((category) => {
          return <DashboardCategoryTableRow key={category.id} category={category} />
        })}
      </DashboardTable>
    </>
  )
})
