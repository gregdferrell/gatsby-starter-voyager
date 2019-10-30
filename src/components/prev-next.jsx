import React from "react"
import { Link } from "gatsby"
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa"

import styles from "./prev-next.module.scss"

const PrevNext = ({ prevDetails, nextDetails }) => {
  return (
    <div className={styles.container}>
      <div className="tl">
        {prevDetails && (
          <>
            {prevDetails.titleText && (
              <p className={styles.titleText}>{prevDetails.titleText}</p>
            )}
            <Link to={prevDetails.linkPath} className={styles.link}>
              <FaArrowCircleLeft className={styles.linkArrowIcon} />{" "}
              {prevDetails.linkText}
            </Link>
          </>
        )}
      </div>
      <div className="tr">
        {nextDetails && (
          <>
            {nextDetails.titleText && (
              <p className={styles.titleText}>{nextDetails.titleText}</p>
            )}
            <Link to={nextDetails.linkPath} className={styles.link}>
              {nextDetails.linkText}{" "}
              <FaArrowCircleRight className={styles.linkArrowIcon} />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default PrevNext
