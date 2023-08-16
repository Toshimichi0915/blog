import { mergeAttributes, Node } from "@tiptap/core"
import Image from "next/image"
import { NodeViewContentProps, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react"
import { css } from "@emotion/react"
import { Asset } from "@/common/db.type"

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { asset: Asset }) => ReturnType
    }
  }
}

function NextImageWrapper({ node }: NodeViewContentProps) {
  const width = `min(100%, ${node.attrs.width}px)`

  return (
    <NodeViewWrapper className="next-image">
      <div css={() => nextImageWrapperStyles(width)} data-drag-handle={true}>
        <Image
          src={node.attrs.src}
          alt=""
          sizes={width}
          width={node.attrs.width}
          height={node.attrs.height}
          className="NextImageWrapper-Image"
        />
      </div>
    </NodeViewWrapper>
  )
}

function nextImageWrapperStyles(width: string) {
  return css`
    display: flex;
    justify-content: center;

    & .NextImageWrapper-Image {
      width: ${width};
      height: auto;
    }
  `
}

export const NextImage = Node.create({
  name: "nextImage",
  group: "block",
  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(NextImageWrapper)
  },

  addAttributes() {
    return {
      src: { default: null },
      width: { default: null },
      height: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: "next-image" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["next-image", mergeAttributes(HTMLAttributes)]
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.asset.url,
              width: options.asset.width,
              height: options.asset.height,
            },
          })
        },
    }
  },
})
