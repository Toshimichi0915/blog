import { useTheme } from "@mui/material"

export function GlobalTheme() {
  const theme = useTheme()
  return (
    <style jsx global>{`
      html {
        color: ${theme.palette.text.primary};
        overflow-y: scroll;
      }

      input,
      textarea,
      button {
        font-family: inherit;
      }

      .ProseMirror {
        outline: none;
        overflow: hidden;
      }

      h1 {
        font-size: ${theme.typography.h1.fontSize};
      }

      h2 {
        font-size: ${theme.typography.h2.fontSize};
      }

      h3 {
        font-size: ${theme.typography.h3.fontSize};
      }

      h4 {
        font-size: ${theme.typography.h4.fontSize};
      }
    `}</style>
  )
}
