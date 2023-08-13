import { ArticleEdit } from "@/client/admin/posts/post-edit.component"
import { GetServerSidePropsContext } from "next"
import { getCategories, getPostById } from "@/server/db.mapper"

export default ArticleEdit

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const [post, categories] = await Promise.all([getPostById(context.params!.id as string), getCategories()])
  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      categories,
    },
  }
}
