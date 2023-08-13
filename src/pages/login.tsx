import { Login } from "@/client/login/login.page"
import { getCsrfToken } from "next-auth/react"
import { GetServerSidePropsContext } from "next"

export default Login

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
