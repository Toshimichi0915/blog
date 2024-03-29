import { createContext, useContext } from "react"
import { Category, Post } from "@/common/db.type"

export interface InitialData {
  categories: Category[]
  posts: Post[]
}

export const InitialDataContext = createContext<InitialData>({
  categories: [],
  posts: [],
})

export function useInitialData() {
  return useContext(InitialDataContext)
}
