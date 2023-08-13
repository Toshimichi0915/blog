import { createTheme, Theme as MuiTheme } from "@mui/material"
import { Noto_Sans_JP } from "next/font/google"

const noto = Noto_Sans_JP({ subsets: ["latin"], weight: "400" })

export const theme = createTheme({
  palette: {
    primary: {
      main: "#001E2F",
    },
    divider: "#D9D9D9",
    text: {
      primary: "#001E2F",
    },
  },
  typography: {
    h1: {
      fontSize: "1.25rem",
    },
    h2: {
      fontSize: "1.2rem",
    },
    h3: {
      fontSize: "1.15rem",
    },
    h4: {
      fontSize: "1.1rem",
    },
    fontFamily: noto.style.fontFamily,
  },
})

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}
