import React from "react"

import BlogListItem from "./blog-list-item"

import styles from "./blog-list.module.scss"

const BlogList = ({ data }) => {
  return (
    <section className={styles.posts}>
      {data.edges.map(({ node }) => (
        <BlogListItem key={node.id} node={node} />
      ))}
    </section>
  )
}

export default BlogList
