import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import styles from "./blog-list-item.module.scss"

const BlogListItem = ({ node }) => {
  return (
    <div key={node.id}>
      <Link to={`/blog/${node.fields.slug}`} className="no-underline">
        <div className={styles.post}>
          <div className={styles.postColumn}>
            <h2 className={styles.title}>{node.frontmatter.title}</h2>
            <p className={styles.subtitle}>
              by {node.frontmatter.author} on {node.frontmatter.date}
            </p>
            {node.frontmatter.tags.length > 0 && (
              <p className={styles.tags}>
                tags: {node.frontmatter.tags.join(", ")}
              </p>
            )}
            <p>{node.frontmatter.excerpt}</p>
          </div>
          <div className={styles.postColumn}>
            <Img
              fluid={node.frontmatter.image.childImageSharp.fluid}
              alt={node.frontmatter.imageAlt}
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogListItem
