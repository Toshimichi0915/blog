import { BinaryAsset } from "@/common/db.type"
import { NodeViewContentProps, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react"
import { css } from "@emotion/react"
import { mergeAttributes, Node } from "@tiptap/core"
import { useCallback } from "react"
import { Theme } from "@mui/material"
import AttachFileIcon from "@mui/icons-material/AttachFile"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    file: {
      setFile: (options: { asset: BinaryAsset }) => ReturnType
    }
  }
}

function FileWrapper({ node }: NodeViewContentProps) {
  return (
    <NodeViewWrapper className="file" data-drag-handle={true}>
      <a css={fileWrapperStyles} href={node.attrs.href} download={node.attrs.name}>
        <AttachFileIcon className="FileWrapper-Icon" />
        <div className="FileWrapper-Container">
          <p className="FileWrapper-Name">{node.attrs.name}</p>
          <p className="FileWrapper-Label">クリックしてダウンロード</p>
        </div>
      </a>
    </NodeViewWrapper>
  )
}

function fileWrapperStyles(theme: Theme) {
  return css`
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    padding: 10px;
    border: 1px solid ${theme.palette.divider};
    border-radius: 3px;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${theme.palette.action.hover};
    }

    & .FileWrapper-Icon {
      color: ${theme.palette.text.primary};
    }

    & .FileWrapper-Name {
      margin: 0;
      color: ${theme.palette.text.primary};
    }

    & .FileWrapper-Label {
      margin: 0;
      color: ${theme.palette.text.secondary};
      font-size: 0.8rem;
    }
  `
}

export const File = Node.create({
  name: "file",
  group: "block",
  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(FileWrapper)
  },

  addAttributes() {
    return {
      href: { default: null },
      name: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: "file" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["file", mergeAttributes(HTMLAttributes)]
  },

  addCommands() {
    return {
      setFile:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              href: options.asset.url,
              name: options.asset.name,
            },
          })
        },
    }
  },
})
