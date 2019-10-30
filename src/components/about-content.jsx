import React from "react"
import Img from "gatsby-image"

import Button from "../components/button"

import styles from "./about-content.module.scss"

const AboutContent = ({
  heading,
  copy,
  image,
  imageAlt,
  imageFirst,
  button,
}) => {
  let imageClassName = imageFirst
    ? styles.imageWrapperFirst
    : styles.imageWrapper

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.copyWrapper}>
        <h2 className="section-heading">{heading}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: copy,
          }}
        ></div>
        {button && <Button linkUrl={button.url} linkText={button.text} />}
      </div>

      <Img fluid={image} alt={imageAlt} className={imageClassName} />
    </section>
  )
}

export default AboutContent
