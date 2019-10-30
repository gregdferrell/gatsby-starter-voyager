import React from "react"

import FeaturedTagItem from "../components/featured-tag-item"

import styles from "./featured-tag-list.module.scss"

const FeaturedTagList = ({ tags }) => {
  return (
    <>
      <h2 className="section-heading">Posts by Tag</h2>
      <div className={styles.featuredTagItemsContainer}>
        {tags.map(({ name, featured_image, featured_image_alt }) => (
          <FeaturedTagItem
            key={name}
            tag={name}
            heading={name[0].toUpperCase() + name.substring(1)}
            image={featured_image.childImageSharp.fluid}
            imageAlt={featured_image_alt}
          />
        ))}
      </div>
    </>
  )
}

export default FeaturedTagList
