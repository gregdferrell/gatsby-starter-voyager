import React from "react"

import { Link } from "gatsby"

import styles from "./button.module.scss"

const Button = ({ linkUrl, linkText }) => {
  return (
    <div className={styles.wrapper}>
      <Link to={linkUrl} className={styles.link}>
        {linkText}
      </Link>
    </div>
  )
}

export default Button
