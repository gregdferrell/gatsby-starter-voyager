# Gatsby Starter Voyager

Gatsby Starter Voyager is feature-rich starter blog. It's MIT licensed and ready to be used as-is or as a starting point from which to build something grander. Use it, learn from it, build on it & enjoy.

### [View Demo](https://gatsby-starter-voyager.netlify.com)

![gatsby starer voyager home page](./voyager-home.png)

# Features

- fast, with top-notch lighthouse audit scores
- responsive, mobile-first design using `tachyons.scss`, flexbox, SCSS & CSS modules
- blog posts, tags and other copy in markdown
- tag listing page and pages for each tag
- author listing page and pages for each author
- pagination and next/prev navigation
- social sharing links on blog posts (twitter, facebook, pinterest)
- fast, optimized images
- SEO component with social sharing cards for twitter & facebook
- structured data, schema.org
- sitemap at `/sitemap.xml`
- rss feed at `/rss.xml`
- support for email subscription to mailchimp campaign
- support for google analytics
- support for blog comments with JustComments
- PWA/offline support

# Development

## Getting Started

```sh
git clone git@github.com:gregdferrell/gatsby-starter-voyager.git
cd gatsby-starter-voyager
npm install

# Standard Gatsby Development Commands

# Run development server
gatsby develop

# Build production distribution
gatsby build

# Locally serve production distribution
gatsby serve
```

## Packages
```
node-sass
gatsby-plugin-sass
gatsby-source-filesystem
gatsby-transformer-remark
gatsby-image
gatsby-transformer-sharp
gatsby-plugin-sharp
gatsby-remark-images
gatsby-remark-relative-images
react-icons
gatsby-plugin-feed
gatsby-plugin-sitemap
gatsby-plugin-robots-txt
react-helmet
gatsby-plugin-react-helmet
gatsby-remark-external-links
gatsby-plugin-just-comments
gatsby-plugin-web-font-loader
gatsby-plugin-manifest
gatsby-plugin-offline
```

## A Note About CSS & Design

I've designed the site using [Tachyons CSS](https://tachyons.io/), [SCSS](https://sass-lang.com/documentation/syntax) and [CSS Modules](https://www.gatsbyjs.org/docs/css-modules).

**Tachyons SCSS Library**
> Create fast loading, highly readable, and 100% responsive interfaces with as little css as possible.

Tachyons makes it easy to create responsive, mobile-first layouts. If you're looking at a CSS module and wondering if there's a method to my madness, well, there is.

For example:
```scss
// Many of my classes within a CSS Module will extend common classes as well as Tachyons classes.

.section-wrapper {
  // First, I'll extend any of my own common classes
  @extend .bg-primary;

  // Then, I'll extend the Tachyons classes, with each subsequent line extending classes for a larger viewport.
  @extend .center, .flex, .flex-column, .items-center, .mb5; // Effective on all screen sizes unless a more specific class (below) overrides it
  @extend .flex-row-l, .mb6-l; // Effective when viewport > ~960px wide
}
```

# Customizing Your Site

Here are the steps you need to take to customize your site from this starter:

## Configure

TODO

## Style & Code

TODO

## Add Content

TODO

# License

Gatsby Starter Voyager is licensed under the MIT License.

# Contributing

If you would like to improve this repo, please do! Contributions are welcome!

# Thanks

This site was built with open source and free images. It, too, is open and free for you to use as you wish. Thanks to the following:
- [GatsbyJS](https://gatsbyjs.org) for a great web development framework.
- [Tachyons CSS](https://tachyons.io) for a great CSS library.
- [Netlify](https://www.netlify.com) for an awesome static hosting platform.
- [Unsplash](https://unsplash.com) and the photographers:
  - [Ahmet Sali](https://unsplash.com/@ahmetsali)
  - [Biel Morro](https://unsplash.com/@bielmorro)
  - [Dmitry Goykolov](https://unsplash.com/@dmitrypraguephotos)
  - [Dylan Mcleod](https://unsplash.com/@dillby777)
  - [Eduardo Dutra](https://unsplash.com/@edwardutra)
  - [Flavio Gasperini](https://unsplash.com/@flaviewxvx)
  - [Florencia Potter](https://unsplash.com/@florenciapotter)
  - [Florian Wehde](https://unsplash.com/@florianwehde)
  - [Guille Pozzi](https://unsplash.com/@guillepozzi)
  - [Jamie Haughton](https://unsplash.com/@haughters)
  - [Jonathan Riley](https://unsplash.com/@jonathan_christian_photography)
  - [Jorge Salvador](https://unsplash.com/@jsshotz)
  - [Luca Bravo](https://unsplash.com/@lucabravo)
  - [Michael Cadieux](https://unsplash.com/@michaelcadieux)
  - [Nadi Whatisdelirium](https://unsplash.com/@whatisdelirium)
  - [Nicolai Berntsen](https://unsplash.com/@nicolaiberntsen)
  - [Pedro Lastra](https://unsplash.com/@peterlaster)
  - [Stephanie Klepacki](https://unsplash.com/@sklepacki)
  - [Unknown Photographer](https://unsplash.com/@unknown_)
  - [Wenhao Ryan](https://unsplash.com/@wenhao_ryan)
  - [Yajnas](https://unsplash.com/@yajnass)
