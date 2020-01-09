import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogList from "../components/blog-list"
import PrevNext from "../components/prev-next"
import Button from "../components/button"

export const query = graphql`
  query($tag: String!, $skip: Int!, $limit: Int!) {
    tagDetails: markdownRemark(
      frontmatter: { type: { eq: "data" }, name: { eq: "tags" } }
    ) {
      frontmatter {
        tag_details {
          description
          name
        }
      }
    }

    posts: allMarkdownRemark(
      filter: {
        frontmatter: { type: { eq: "post" }, tags: { in: [$tag] } }
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

const Tags = ({ data, pageContext }) => {
  const { tag, currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? `/blog/tags/${tag}`
      : `/blog/tags/${tag}/` + (currentPage - 1).toString()
  const nextPage = `/blog/tags/${tag}/` + (currentPage + 1).toString()

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

  let tagDetails = data.tagDetails.frontmatter.tag_details.filter(obj => {
    return obj.name === tag
  })
  tagDetails = tagDetails.length > 0 ? tagDetails[0] : null

  return (
    <Layout
      title={`Articles tagged ${tag} - Page ${currentPage}`}
      pathName={`/blog/tags/${tag}`}
    >
      <header className="tc">
        <h1 className="page-heading">Articles Tagged "{tag}"</h1>
      </header>

      {tagDetails && tagDetails.description && (
        <div className="mh6-l mt4 ph4 tc">
          <p>{tagDetails.description}</p>
        </div>
      )}

      <div className="mv5">
        <Button linkUrl="/blog/tags" linkText="All Tags" />
      </div>

      <BlogList data={data.posts} />
      <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
    </Layout>
  )
}

export default Tags
