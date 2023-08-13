import { ChangeEvent, memo, useCallback } from "react"
import { Editor, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Theme } from "@mui/material"
import { css } from "@emotion/react"
import InvertColorsOffIcon from "@mui/icons-material/InvertColorsOff"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"

export const ArticleEditor = memo(function ArticleEditor({
  content,
  onSave,
}: {
  content: string
  onSave(editor: Editor): void
}) {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content,
    onUpdate() {
      const currentEditor = editor
      if (!currentEditor) return
      onSave(currentEditor)
    },
  })

  const buttonClassName = useCallback((isActive: boolean | undefined) => {
    return `ArticleEditor-Button ${isActive ? "ArticleEditor-Button-Active" : ""}`
  }, [])

  const hasH2 = editor?.isActive("heading", { level: 2 })
  const setH2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).run()

  const hasH3 = editor?.isActive("heading", { level: 3 })
  const setH3 = () => editor?.chain().focus().toggleHeading({ level: 3 }).run()

  const hasH4 = editor?.isActive("heading", { level: 4 })
  const setH4 = () => editor?.chain().focus().toggleHeading({ level: 4 }).run()

  const hasP = editor?.isActive("paragraph")
  const setP = () => editor?.chain().focus().setParagraph().run()

  const clear = () => editor?.chain().focus().unsetAllMarks().run()

  const color = editor?.getAttributes("textStyle").color ?? "#000000"
  const setColor = (e: ChangeEvent<HTMLInputElement>) => editor?.chain().focus().setColor(e.target.value).run()

  const bullet = editor?.isActive("bulletList")
  const setBullet = () => editor?.chain().focus().toggleBulletList().run()

  const number = editor?.isActive("orderedList")
  const setNumber = () => editor?.chain().focus().toggleOrderedList().run()

  return (
    <div css={articleEditorStyles}>
      <div className="ArticleEditor-Tab">
        <button className={buttonClassName(hasP)} onClick={setP}>
          P
        </button>
        <button className={buttonClassName(hasH2)} onClick={setH2}>
          H2
        </button>
        <button className={buttonClassName(hasH3)} onClick={setH3}>
          H3
        </button>
        <button className={buttonClassName(hasH4)} onClick={setH4}>
          H4
        </button>
        <input type="color" className={buttonClassName(false)} value={color} onInput={setColor} />
        <button className="ArticleEditor-Button" onClick={clear}>
          <InvertColorsOffIcon />
        </button>
        <div />
        <button className={buttonClassName(bullet)} onClick={setBullet}>
          <FormatListBulletedIcon />
        </button>
        <button className={buttonClassName(number)} onClick={setNumber}>
          <FormatListNumberedIcon />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
})

function articleEditorStyles(theme: Theme) {
  return css`
    border: 1px solid ${theme.palette.primary.main};
    border-radius: 3px;
    padding: 10px;

    & .ArticleEditor-Tab {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid ${theme.palette.divider};
      background-color: ${theme.palette.background.default};
      position: sticky;
      margin-top: -10px;
      padding-top: 10px;
      top: 0;
      z-index: 1;
    }

    & .ArticleEditor-Button {
      display: grid;
      place-items: center;
      border: 1px solid ${theme.palette.primary.main};
      border-radius: 3px;
      font-weight: bold;
      background: none;
      cursor: pointer;
      padding: 5px;
      height: 35px;
      width: 35px;
    }

    & .ArticleEditor-Button-Active {
      color: ${theme.palette.primary.contrastText};
      background: ${theme.palette.primary.main};
    }
  `
}
