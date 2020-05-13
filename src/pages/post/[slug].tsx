import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import { getSlugs } from '../../utils/get-slug'

type Props = {
  frontmatter: Frontmatter
  markdown: string
}

const Post: NextPage<Props> = ({ frontmatter, markdown }) => {
  return (
    <React.Fragment>
      <h1>{frontmatter.title}</h1>
      <small>{frontmatter.date}</small>
      <section>
        <ReactMarkdown source={markdown} />
      </section>
    </React.Fragment>
  )
}

export default Post

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const content = await import(`../../contents/${params?.slug}.md`)
  const { data: frontmatter, content: markdown } = matter(content.default)
  return { props: { frontmatter, markdown } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getSlugs(require.context('../../contents', true, /\.md$/))
  const paths = slugs.map((slug: string) => `/post/${slug}`)
  return { paths, fallback: false }
}