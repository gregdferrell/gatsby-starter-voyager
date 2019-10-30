import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"

const NotFound = ({ data }) => {
  return (
    <Layout title="Oops. Page not found.">
      <h1 className="page-heading">Oops. Page not found.</h1>
      <Img
        fluid={data.photo404.childImageSharp.fluid}
        alt="Monkey, not found!"
        className="mb5"
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    photo404: file(relativePath: { eq: "jamie-haughton-Z05GiksmqYU-unsplash.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 900, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default NotFound
