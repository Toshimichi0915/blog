import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from "react"
import { PostUpdateInput } from "@/common/db.type"
import Link from "next/link"
import { LinearProgress, MenuItem, Select, SelectChangeEvent, TextField, Theme } from "@mui/material"
import { css } from "@emotion/react"
import { ArticleEditor } from "@/client/common/article-editor.component"
import { Editor } from "@tiptap/react"
import { usePostEdit } from "@/client/admin/dashboard/post.hook"
import { useIsMutating } from "@tanstack/react-query"
import { InferGetServerSidePropsType } from "next"
import { getServerSideProps } from "@/pages/admin/posts/[id]"

export const ArticleEdit = memo(function Article({
  post,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { update } = usePostEdit(post.id)

  const [data, setData] = useState<
    PostUpdateInput & {
      editor?: Editor
    }
  >({
    title: post.title,
    slug: post.slug,
    categoryId: post.category?.id ?? "None",
    content: post.content,
  })

  const editorRef = useRef<Editor>()
  const saveTimer = useRef<NodeJS.Timeout>()

  const startSaveTimer = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(
      () =>
        update({
          ...data,
          categoryId: data.categoryId === "None" ? undefined : data.categoryId,
          content: JSON.stringify(editorRef.current?.getJSON()) ?? data.content,
        }),
      1000
    )
  }, [data, update])

  const setTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setData((data) => ({
        ...data,
        title: e.target.value,
      })),
    []
  )

  const setSlug = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setData((data) => ({
        ...data,
        slug: e.target.value,
      })),
    []
  )

  const setCategoryId = useCallback(
    (e: SelectChangeEvent) =>
      setData((data) => ({
        ...data,
        categoryId: e.target.value,
      })),
    []
  )

  const setContent = useCallback(
    (editor: Editor) => {
      editorRef.current = editor
      startSaveTimer()
    },
    [startSaveTimer]
  )

  useEffect(() => startSaveTimer(), [data])

  const isSaving = useIsMutating({ mutationKey: ["posts", post.id] }) > 0

  return (
    <main css={articleStyles}>
      <h1 className="ArticleEdit-Title">{data.title || "No title :("}</h1>
      <div className="ArticleEdit-Nav">
        <Link href="/admin/dashboard" className="ArticleEdit-NavLink">
          管理画面へ戻る
        </Link>
        <Link href={`/posts/${data.slug}`} className="ArticleEdit-NavLink">
          記事を見る
        </Link>
        <Link href="/" className="ArticleEdit-NavLink">
          トップへ戻る
        </Link>
      </div>
      <div className="ArticleEdit-Content">
        {isSaving ? <LinearProgress /> : <div className="ArticleEdit-ProgressPlaceholder" />}
        <div className="ArticleEdit-Meta">
          <TextField
            className="ArticleEdit-MetaTitle"
            value={data.title}
            onChange={setTitle}
            label="title"
            margin="dense"
          />
          <TextField
            className="ArticleEdit-MetaSlug"
            value={data.slug}
            onChange={setSlug}
            label="slug"
            margin="dense"
          />
          <Select className="ArticleEdit-MetaCategory" value={data.categoryId} onChange={setCategoryId} margin="dense">
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
            <MenuItem value="None">None</MenuItem>
          </Select>
        </div>
        <ArticleEditor content={post.content} onSave={setContent} />
      </div>
    </main>
  )
})

function articleStyles(theme: Theme) {
  return css`
    display: grid;
    grid-template-columns: 1fr max-content;
    margin: 5%;

    & .ArticleEdit-Title {
      margin-top: 0;
      padding-left: calc(90vw * 0.05);
      margin-bottom: 0.6rem;
    }

    & .ArticleEdit-Nav {
      display: flex;
      justify-content: flex-end;
      gap: 20px;
      align-items: center;
      padding-right: calc(90vw * 0.05);
    }

    & .ArticleEdit-NavLink {
      text-decoration: none;
      color: ${theme.palette.text.primary};
      white-space: nowrap;
      margin-bottom: 0.6rem;

      &:hover {
        text-decoration: underline;
      }
    }

    & .ArticleEdit-ProgressPlaceholder {
      height: 4px;
    }

    & .ArticleEdit-Meta {
      display: flex;
      gap: 4px;
    }

    & .ArticleEdit-MetaTitle {
      flex: 1;
    }

    & .ArticleEdit-MetaCategory {
      margin-top: 8px;
      height: fit-content;
    }

    & .ArticleEdit-Content {
      grid-column: 1 / 3;
      border-top: 1px solid ${theme.palette.primary.main};
      padding-top: 35px;
      padding-left: 5%;
      padding-right: 5%;
    }
  `
}
