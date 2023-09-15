import { SessionProvider } from "next-auth/react"

import "@/styles/global.scss"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Head from "next/head"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "@/client/common/theme.util"
import { GlobalTheme } from "@/client/common/theme.component"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="Toshimichiのブログです。
        ゲーム・プログラミングやデザインパターンについて、自分が思ったことを自由に書き残しています。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="Toshimichi Blog" />
        <meta property="og:description" content="Toshimichiのブログです" />
        <meta property="og:type" content="website" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalTheme />
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}
