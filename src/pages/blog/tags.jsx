import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Layout from "../../components/layout"

import styles from "./tags.module.scss"

const Tags = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "post" } } published: { eq: true } }) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  return (
    <Layout title="All Blog Tags" pathName="/blog/tags">
      <h1 className="page-heading">Tags</h1>
      <section className={styles.tagSection}>
        {data.allMarkdownRemark.group.map(tag => (
          <div key={tag.fieldValue}>
            <Link to={`/blog/tags/${tag.fieldValue}`}>
              <div className={styles.tagWrapper}>
                <h2 className="section-heading">
                  {tag.fieldValue} ({tag.totalCount})
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default Tags
