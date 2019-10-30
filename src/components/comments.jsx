import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import JustComments from "gatsby-plugin-just-comments"

import styles from "./comments.module.scss"

import "../styles/just-comments-override.scss"

const Comments = () => {
  const data = useStaticQuery(graphql`
    query {
      siteMetadata: site {
        siteMetadata {
          justCommentsApiKey
        }
      }
    }
  `)

  useEffect(() => {
    const justCommentsElement = document.querySelector(".just-comments")

    if (justCommentsElement) {
      justCommentsElement.classList.add("my-just-comments-theme")
    }
  })

  return (
    <div id="comments-section" className={styles.commentsSection}>
      <JustComments
        apikey={data.siteMetadata.siteMetadata.justCommentsApiKey}
        disableanonymouslogin={false}
        recaptcha={false}
        disablesharebutton={true}
        disableseo={true}
        hideattribution={true}
        disablepushnotifications={true}
      />
    </div>
  )
}

export default Comments
