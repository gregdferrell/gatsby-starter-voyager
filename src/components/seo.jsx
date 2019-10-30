import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({
  isArticle,
  title,
  description,
  image,
  author,
  pathName,
  datePublished,
}) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const seo = {
          title: title
            ? `${title} | ${data.site.siteMetadata.title}`
            : data.site.siteMetadata.title,
          description: description
            ? description
            : data.site.siteMetadata.description,
          publisher: data.site.siteMetadata.publisher,
          author: author ? `${author}` : `${data.site.siteMetadata.author}`,
          image: image
            ? `${data.site.siteMetadata.siteUrl}${image}`
            : `${data.site.siteMetadata.siteUrl}${data.site.siteMetadata.image}`,
          url: pathName
            ? `${data.site.siteMetadata.siteUrl}${pathName}`
            : data.site.siteMetadata.siteUrl,
        }

        // schema.org in JSONLD format
        // https://developers.google.com/search/docs/guides/intro-structured-data

        let schemaOrgWebPage,
          schemaOrgBlogPosting,
          schemaOrgBreadcrumbList = null

        // Type WebPage: for all pages that aren't blog posts
        if (!isArticle) {
          schemaOrgWebPage = {
            "@context": "http://schema.org",
            "@type": "WebPage",
            url: seo.url,
            mainEntityOfPage: seo.url,
            inLanguage: "en",
            headline: seo.title,
            description: seo.description,
            author: {
              "@type": "Person",
              name: seo.author,
            },
            copyrightHolder: {
              "@type": "Person",
              name: seo.author,
            },
            copyrightYear: "2019",
            creator: {
              "@type": "Person",
              name: seo.author,
            },
            publisher: {
              "@type": "Organization",
              name: seo.publisher,
              logo: {
                "@type": "ImageObject",
                url: `${data.site.siteMetadata.siteUrl}${data.site.siteMetadata.bannerImage}`,
                height: 60,
                width: 600,
              },
            },
            datePublished: "2019-10-13T00:00:00+02:00",
            dateModified: data.site.buildTime,
            image: {
              "@type": "ImageObject",
              url: `${seo.image}`,
            },
          }
        }

        // Type BlogPosting: for all pages that are blog posts
        if (isArticle) {
          schemaOrgBlogPosting = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": seo.url,
            },
            headline: seo.title,
            description: seo.description,
            image: [seo.image],
            datePublished: datePublished,
            dateModified: datePublished,
            author: {
              "@type": "Person",
              name: seo.author,
            },
            publisher: {
              "@type": "Organization",
              name: seo.publisher,
              logo: {
                "@type": "ImageObject",
                url: `${data.site.siteMetadata.siteUrl}${data.site.siteMetadata.bannerImage}`,
                height: 60,
                width: 600,
              },
            },
          }
        }

        // Type Breadcrumbs: for all pages (blog post or not)
        // always include home page in breadcrumbs
        const itemListElement = [
          {
            "@type": "ListItem",
            item: {
              "@id": data.site.siteMetadata.siteUrl,
              name: "Home",
            },
            position: 1,
          },
        ]

        // include blog post page if this is a blog post
        if (isArticle) {
          itemListElement.push({
            "@type": "ListItem",
            item: {
              "@id": `${data.site.siteMetadata.siteUrl}/blog`,
              name: "Blog",
            },
            position: 2,
          })
          itemListElement.push({
            "@type": "ListItem",
            item: {
              "@id": seo.url,
              name: seo.title,
            },
            position: 3,
          })
        }

        schemaOrgBreadcrumbList = {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          description: "Breadcrumbs list",
          name: "Breadcrumbs",
          itemListElement,
        }

        return (
          <Helmet
            htmlAttributes={{
              lang: "en",
            }}
          >
            {/* Primary Tags */}
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="description" content={seo.description} />
            {/* Open Graph Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            {/* Twitter Tags */}
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:site"
              content={`@${data.site.siteMetadata.social.twitter}`}
            />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            {/* Schema Org */}
            {!isArticle && (
              <script type="application/ld+json">
                {JSON.stringify(schemaOrgWebPage)}
              </script>
            )}
            {isArticle && (
              <script type="application/ld+json">
                {JSON.stringify(schemaOrgBlogPosting)}
              </script>
            )}
            <script type="application/ld+json">
              {JSON.stringify(schemaOrgBreadcrumbList)}
            </script>
          </Helmet>
        )
      }}
    />
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      buildTime
      siteMetadata {
        author
        bannerImage
        description
        image
        publisher
        siteUrl
        title
        social {
          twitter
        }
      }
    }
  }
`
