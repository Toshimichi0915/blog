import { Dashboard } from "@/client/admin/dashboard/dashboard.page"
import { getCategories, getPosts } from "@/server/db.mapper"

export default Dashboard

export async function getServerSideProps() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  return {
    props: {
      posts,
      categories,
    },
  }
}
