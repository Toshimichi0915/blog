import { Index } from "@/client/index/index.page"
import { getCategories, getPosts } from "@/server/db.mapper"

export default Index

export async function getStaticProps() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 60,
  }
}
