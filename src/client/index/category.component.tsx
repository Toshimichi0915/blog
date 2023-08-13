import { Post, Category } from "@/common/db.type"
import { memo } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Theme } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { css } from "@emotion/react"
import Link from "next/link"

export const IndexCategory = memo(function IndexCategory({ category, posts }: { category: Category; posts: Post[] }) {
  return (
    <Accordion css={indexCategoryStyles} disableGutters elevation={0} square>
      <AccordionSummary className="IndexCategory-Summary" expandIcon={<ExpandMoreIcon />}>
        {category.name}
      </AccordionSummary>
      <AccordionDetails className="IndexCategory-Details">
        <ul className="IndexCategory-Articles">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`posts/${post.slug}`} className="IndexCategory-Article">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  )
})

function indexCategoryStyles(theme: Theme) {
  return css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    border: 1px solid ${theme.palette.primary.main};
    border-radius: 3px;

    & .IndexCategory-Summary {
      flex-direction: row-reverse;

      & .MuiAccordionSummary-expandIconWrapper {
        color: ${theme.palette.primary.contrastText};
        transform: rotate(-90deg);

        &.Mui-expanded {
          transform: rotate(0deg);
        }
      }
    }

    & .IndexCategory-Details {
      background-color: ${theme.palette.background.default};
      color: ${theme.palette.text.primary};
    }

    & .IndexCategory-Articles {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    & .IndexCategory-Article {
      text-decoration: none;
      color: ${theme.palette.text.primary};

      &:hover {
        text-decoration: underline;
      }
    }
  `
}
