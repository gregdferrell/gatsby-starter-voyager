import React from "react"

import SEO from "./seo"
import Header from "./header"
import Footer from "./footer"

import "../styles/main.scss"
import styles from "./layout.module.scss"

const Layout = props => {
  const { children, layoutFullWidth, isArticle, title, description, image, author, pathName, datePublished } = props

  return (
    <>
      <SEO isArticle={isArticle} title={title} description={description} image={image} author={author} pathName={pathName} datePublished={datePublished}/>
      <Header />
      {layoutFullWidth ? (
        <section className={styles.layout}>{children}</section>
      ) : (
        <section className={styles.layoutNarrow}>{children}</section>
      )}
      <Footer />
    </>
  )
}

export default Layout
