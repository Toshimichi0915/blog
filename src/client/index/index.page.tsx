import { memo } from "react"
import { css } from "@emotion/react"
import { Theme } from "@mui/material"
import { InferGetStaticPropsType } from "next"
import { getStaticProps } from "@/pages"
import { IndexCategory } from "@/client/index/category.component"

export const Index = memo(function Index({
  posts,
  categories: categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main css={indexStyles}>
      <h1 className="Index-Title">Data available, provided by Toshimichi</h1>
      <p className="Index-Subtitle">利用可能なデータ一覧</p>
      <div className="Index-Categories">
        {categories.map((category) => (
          <IndexCategory
            key={category.id}
            category={category}
            posts={posts.filter((post) => post.category?.id === category.id)}
          />
        ))}
      </div>
    </main>
  )
})

function indexStyles(theme: Theme) {
  return css`
    margin: 5%;

    & .Index-Title {
      margin-bottom: 5px;
    }

    & .Index-Subtitle {
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid ${theme.palette.primary.main};
      margin-bottom: 0.6rem;
    }

    & .Index-Categories {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
      gap: 40px;
    }
  `
}
