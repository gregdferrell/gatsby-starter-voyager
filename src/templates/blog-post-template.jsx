import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import PrevNext from "../components/prev-next"
import Button from "../components/button"
import SocialShare from "../components/social-share"

import styles from "./blog-post-template.module.scss"

export const queryPostBySlug = graphql`
  query($slug: String!) {
    post: markdownRemark(
      frontmatter: { type: { eq: "post" } }
      fields: { slug: { eq: $slug } }
    ) {
      frontmatter {
        title
        author
        date
        dateFormattedPretty: date(formatString: "MMMM Do, YYYY")
        draft
        tags
        excerpt
        image {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          publicURL
        }
        imageAlt
      }
      html
      id
      fields {
        slug
      }
    }
    site: site {
      siteMetadata {
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`

const BlogPosts = ({ data, pageContext }) => {
  const { post } = data
  const { next, prev } = pageContext

  const nextDetails = !next
    ? null
    : {
        titleText: "Next Post",
        linkPath: "/blog/" + next.fields.slug,
        linkText: next.frontmatter.title,
      }

  const prevDetails = !prev
    ? null
    : {
        titleText: "Previous Post",
        linkPath: "/blog/" + prev.fields.slug,
        linkText: prev.frontmatter.title,
      }

  return (
    <Layout
      isArticle={true}
      title={post.frontmatter.title}
      description={post.frontmatter.excerpt}
      image={post.frontmatter.image.publicURL}
      author={post.frontmatter.author}
      pathName={`/blog/${post.fields.slug}`}
      datePublished={post.frontmatter.date}
    >
      <article className="ph4">
        <header className={styles.header}>
          <h1 className={styles.title}>{post.frontmatter.title}</h1>
          {post.frontmatter.draft && (
            <div className={styles.draft}>
              <span>! This post is a draft and will not be published in production !</span>
            </div>
          )}
          <div>
            <span className={styles.subtitle}>
              by{" "}
              <Link to={`/blog/authors/${post.frontmatter.author}`}>
                {post.frontmatter.author}
              </Link>{" "}
              on {post.frontmatter.dateFormattedPretty}
            </span>
          </div>
          <SocialShare
            text="SHARE THIS POST"
            shareTitle={post.frontmatter.title}
            shareUrl={`${data.site.siteMetadata.siteUrl}/blog/${post.fields.slug}`}
          />
          <div className={styles.tagListContainer}>
            {post.frontmatter.tags.map(tag => (
              <Button key={tag} linkUrl={`/blog/tags/${tag}`} linkText={tag} />
            ))}
          </div>
        </header>
        <Img
          fluid={post.frontmatter.image.childImageSharp.fluid}
          alt={post.frontmatter.imageAlt}
        />

        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>

        <div className={styles.postEnd}>
          <h3 className="section-sub-heading">Thanks for reading!</h3>
          <SocialShare
            text="SHARE THIS POST"
            shareTitle={post.frontmatter.title}
            shareUrl={`${data.site.siteMetadata.siteUrl}/blog/${post.fields.slug}`}
          />
        </div>

        <PrevNext prevDetails={prevDetails} nextDetails={nextDetails} />
      </article>
    </Layout>
  )
}

export default BlogPosts
