import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FaInstagram, FaTwitter } from "react-icons/fa"

import styles from "./header.module.scss"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      siteMetadata: site {
        siteMetadata {
          social {
            instagram
            twitter
          }
        }
      }
    }
  `)

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <nav className={styles.navMain}>
          <span>
            <Link to="/" className={styles.navHomeLink}>
              Voyager
            </Link>
          </span>

          <div className={styles.navItemList}>
            <Link
              to="/"
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={styles.navItem}
              activeClassName={styles.navItemActive}
              partiallyActive={true}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              About
            </Link>
            <a
              href={`https://www.instagram.com/${data.siteMetadata.siteMetadata.social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml3 ml4-l"
            >
              <FaInstagram className="icon" alt="instagram icon link"/>
            </a>
            <a
              href={`https://www.twitter.com/${data.siteMetadata.siteMetadata.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml3 ml4-l"
            >
              <FaTwitter className="icon" alt="twitter icon link"/>
            </a>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
