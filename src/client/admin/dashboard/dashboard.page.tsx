import { memo } from "react"
import { css } from "@emotion/react"
import { Theme } from "@mui/material"
import { DashboardCategories } from "@/client/admin/dashboard/category.component"
import { InferGetServerSidePropsType } from "next"
import { getServerSideProps } from "@/pages/admin/dashboard"
import { InitialDataContext } from "@/client/admin/dashboard/initial-data.store"
import { DashboardPosts } from "@/client/admin/dashboard/post.component"

export const Dashboard = memo(function DashboardPage({
  posts,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <InitialDataContext.Provider value={{ posts, categories }}>
      <main css={dashboardPageStyle}>
        <h1 className="DashboardPage-Title">Dashboard</h1>
        <div className="DashboardPage-Content">
          <DashboardCategories />
        </div>
        <div className="DashboardPage-Content">
          <DashboardPosts />
        </div>
      </main>
    </InitialDataContext.Provider>
  )
})

function dashboardPageStyle(theme: Theme) {
  return css`
    margin: 5%;

    & .DashboardPage-Title {
      padding-bottom: 10px;
      border-bottom: 1px solid ${theme.palette.primary.main};
      padding-left: 5%;
      margin-bottom: 0.6rem;
    }

    & .DashboardPage-Content {
      margin: 35px 5% 0 5%;
    }
  `
}
