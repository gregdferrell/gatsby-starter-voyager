import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogList from "../components/blog-list"
import PrevNext from "../components/prev-next"
import Button from "../components/button"

export const query = graphql`
  query($author: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { type: { eq: "post" }, author: { in: [$author] } }
        published: { eq: true }
      }
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author
            date(formatString: "MMMM Do, YYYY")
            tags
            excerpt
            image {
              childImageSharp {
                fluid(maxWidth: 750, quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            imageAlt
          }
          id
        }
      }
    }
  }
`

const Authors = ({ data, pageContext }) => {
  const { author, currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? `/blog/authors/${author}`
      : `/blog/authors/${author}/` + (currentPage - 1).toString()
  const nextPage = `/blog/authors/${author}/` + (currentPage + 1).toString()

  const prevDetails = isFirst
    ? null
    : {
        linkPath: prevPage,
        linkText: "Previous Page",
      }

  const nextDetails = isLast
    ? null
    : {
        linkPath: nextPage,
        linkText: "Next Page",
      }

  return (
    <Layout
      title={`Articles by ${author} - Page ${currentPage}`}
      pathName={`/blog/authors/${author}`}
    >
      <header className="tc">
        <h1 className="page-heading">Articles by {author}</h1>
        <div className="mt5">
          <Button linkUrl="/blog/authors" linkText="All Authors" />
        </div>
      </header>
      <BlogList data={data.allMarkdownRemark} />
      <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
    </Layout>
  )
}

export default Authors
