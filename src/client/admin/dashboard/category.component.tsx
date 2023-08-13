import { memo, useCallback, useState } from "react"
import { DashboardTable, DashboardCategoryTableRow } from "@/client/admin/dashboard/table.component"

import { useCategories } from "@/client/admin/dashboard/category.hook"
import { CategoryCreateDialog } from "@/client/admin/dashboard/category-create.component"

export const DashboardCategories = memo(function CategoriesComponent() {
  const { create, categories } = useCategories()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const openCreateDialog = useCallback(() => setCreateDialogOpen(true), [])
  const closeCreateDialog = useCallback(() => setCreateDialogOpen(false), [])

  return (
    <>
      <CategoryCreateDialog open={createDialogOpen} onClose={closeCreateDialog} onCreate={create} />
      <DashboardTable title="Manage Categories" onCreate={openCreateDialog}>
        {categories.map((category) => {
          return <DashboardCategoryTableRow key={category.id} category={category} />
        })}
      </DashboardTable>
    </>
  )
})
