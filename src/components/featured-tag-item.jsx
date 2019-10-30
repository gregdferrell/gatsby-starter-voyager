import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import styles from "./featured-tag-item.module.scss"

const FeaturedTagItem = ({ tag, heading, image, imageAlt }) => {
  return (
    <div className={styles.featuredTagItem}>
      <Link to={`/blog/tags/${tag}`}>
        <h3 className="section-sub-heading">{heading}</h3>
        <Img fluid={image} alt={imageAlt} />
      </Link>
    </div>
  )
}

export default FeaturedTagItem
