import { getPostBySlug } from "@/server/db.mapper"
import { GetStaticPropsContext } from "next"
import { Article } from "@/client/posts/post.page"

export default Article

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const post = await getPostBySlug(context.params!.id as string)
  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
