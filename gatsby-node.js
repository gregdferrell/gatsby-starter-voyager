const path = require("path")

const { GraphQLBoolean } = require("gatsby/graphql")

// Add `published` property to MarkdownRemark nodes to indicate if this markdown is to be published.
module.exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if ("MarkdownRemark" === type.name) {
    return {
      published: {
        type: GraphQLBoolean,
        resolve: ({ frontmatter }) => {
          // Always set `published` field to true when not in production mode
          // or if frontmatter.draft is not set.
          if (
            process.env.NODE_ENV !== "production" ||
            frontmatter.draft == undefined
          ) {
            return true
          }

          return !frontmatter.draft
        },
      },
    }
  }
  return {}
}

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // For all "MarkdownRemark" nodes of type "post", add a slug to the node based
  // on the filename
  if (node.internal.type === "MarkdownRemark") {
    if (node.frontmatter.type === "post") {
      const slug = path.basename(node.fileAbsolutePath, ".md")

      createNodeField({
        node,
        name: "slug",
        value: slug,
      })
    }
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(
    "./src/templates/blog-post-template.jsx"
  )
  const blogListTemplate = path.resolve(
    "./src/templates/blog-list-template.jsx"
  )
  const blogPostsByTagTemplate = path.resolve(
    "./src/templates/blog-posts-by-tag-template.jsx"
  )
  const blogPostsByAuthorTemplate = path.resolve(
    "./src/templates/blog-posts-by-author-template.jsx"
  )

  const res = await graphql(`
    query {
      postsRemark: allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" } }
          published: { eq: true }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }

      tagsGroup: allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" } }
          published: { eq: true }
        }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }

      authorsGroup: allMarkdownRemark(
        filter: {
          frontmatter: { type: { eq: "post" } }
          published: { eq: true }
        }
      ) {
        group(field: frontmatter___author) {
          fieldValue
          totalCount
        }
      }

      siteMetaData: site {
        siteMetadata {
          blogPostsPerPage
        }
      }
    }
  `)

  const posts = res.data.postsRemark.edges
  const postsPerPage = res.data.siteMetaData.siteMetadata.blogPostsPerPage
  const numBlogListPages = Math.ceil(posts.length / postsPerPage)
  const tags = res.data.tagsGroup.group
  const authors = res.data.authorsGroup.group

  // Create blog post detail pages
  // Example: /blog/my-first-post
  posts.forEach(({ node, next, previous }) => {
    createPage({
      component: blogPostTemplate,
      path: `/blog/${node.fields.slug}`,
      context: {
        slug: node.fields.slug,
        prev: next, // prev = next is on purpose. in the context of the blog post template, the next post is the one posted later, not before
        next: previous, // see above comment
      },
    })
  })

  // Create paginated blog listing pages
  // Example: /blog, /blog/2, blog/3, etc
  Array.from({ length: numBlogListPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numBlogListPages,
        currentPage: i + 1,
      },
    })
  })

  // Create paginated blog tag listing pages for each tag
  // Example: /blog/tag/first-tag, /blog/tag/first-tag/2, /blog/tag/second-tag, etc
  tags.forEach(tag => {
    const tagName = tag.fieldValue
    const tagCount = tag.totalCount
    const numTagListPages = Math.ceil(tagCount / postsPerPage)

    Array.from({ length: numTagListPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0 ? `/blog/tags/${tagName}` : `/blog/tags/${tagName}/${i + 1}`,
        component: blogPostsByTagTemplate,
        context: {
          tag: tagName,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numTagListPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // Create paginated blog author listing pages for each author
  // Example: /blog/author/savannah, /blog/author/savannah/2, /blog/author/maya, etc
  authors.forEach(author => {
    const authorName = author.fieldValue
    const authorCount = author.totalCount
    const numAuthorListPages = Math.ceil(authorCount / postsPerPage)

    Array.from({ length: numAuthorListPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/blog/authors/${authorName}`
            : `/blog/authors/${authorName}/${i + 1}`,
        component: blogPostsByAuthorTemplate,
        context: {
          author: authorName,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages: numAuthorListPages,
          currentPage: i + 1,
        },
      })
    })
  })
}
