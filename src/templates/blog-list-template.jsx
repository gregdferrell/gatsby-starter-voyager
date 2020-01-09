import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BlogList from "../components/blog-list"
import PrevNext from "../components/prev-next"

import styles from "./blog-list-template.module.scss"

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "post" } } published: { eq: true } }
      limit: $limit
      skip: $skip
      sort: { fields: frontmatter___date, order: DESC }
    ) {
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

const BlogListTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : "/blog/" + (currentPage - 1).toString()
  const nextPage = "/blog/" + (currentPage + 1).toString()

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
    <Layout title={`Blog - Page ${currentPage}`} pathName="/blog">
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
      </header>
      <BlogList data={data.allMarkdownRemark} />
      <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
    </Layout>
  )
}

export default BlogListTemplate
