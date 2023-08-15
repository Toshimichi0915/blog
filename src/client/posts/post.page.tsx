import { memo } from "react"
import { Post } from "@/common/db.type"
import { css } from "@emotion/react"
import { Theme } from "@mui/material"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import { NextImage } from "@/client/common/tiptap.util"
import { Youtube } from "@tiptap/extension-youtube"

export const Article = memo(function Article({ post }: { post: Post }) {
  const session = useSession()

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, NextImage, Youtube],
    content: JSON.parse(post.content ?? null),
    editable: false,
  })

  return (
    <main css={articleStyles}>
      <h1 className="Article-Title">{post.title}</h1>
      <div className="Article-Nav">
        {session.data && (
          <Link href={`/admin/posts/${post.id}`} className="Article-NavLink">
            編集する
          </Link>
        )}
        <Link href="/" className="Article-NavLink">
          トップへ戻る
        </Link>
      </div>
      <div className="Article-Content">
        <EditorContent editor={editor} />
      </div>
    </main>
  )
})

function articleStyles(theme: Theme) {
  return css`
    display: grid;
    grid-template-columns: 1fr max-content;
    margin: 5%;

    & .Article-Title {
      font-size: ${theme.typography.h1.fontSize};
      margin-top: 0;
      padding-left: calc(90vw * 0.05);
      margin-bottom: 0.6rem;
    }

    & .Article-Nav {
      display: flex;
      justify-content: flex-end;
      gap: 20px;
      align-items: center;
      padding-right: calc(90vw * 0.05);
    }

    & .Article-NavLink {
      text-decoration: none;
      color: ${theme.palette.text.primary};
      white-space: nowrap;
      margin-bottom: 0.6rem;

      &:hover {
        text-decoration: underline;
      }
    }

    & .Article-Content {
      grid-column: 1 / 3;
      border-top: 1px solid ${theme.palette.primary.main};
      padding-top: 35px;
      padding-left: 5%;
      padding-right: 5%;
      overflow: hidden;
    }
  `
}
