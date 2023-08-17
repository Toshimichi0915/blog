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

      .ProseMirror div[data-youtube-video] {
        display: flex;
        justify-content: center;
      }

      .ProseMirror div[data-youtube-video] iframe {
        max-width: 100%;
        width: 768px;
        min-width: 50%;
        height: auto;
        aspect-ratio: 16 / 9;
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

      @media (max-width: 600px) {

      }
    `}</style>
  )
}
