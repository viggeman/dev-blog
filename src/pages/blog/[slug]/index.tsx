import Article from '@/components/Article/Article';
import { getStoryblokApi, ISbStoriesParams, SbBlokData } from '@storyblok/react';
import { FC } from 'react';
import styles from './BlogPage.module.scss';

interface Props {
  story: SbBlokData; // extend with types from SB
}

const BlogPage: FC<Props> = ({ story }) => {
  const articleContent = story.content;
  return (
    <div className={styles.container}>
      <Article article={articleContent} />
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  const slug = params.slug;

  let sbParams: ISbStoriesParams = {
    version: 'draft', // or 'published'
    resolve_links: 'url',
  };

  const storyblokApi = getStoryblokApi();

  try {
    let { data } = await storyblokApi.get(`cdn/stories/blog/${slug}`, sbParams);

    return {
      props: {
        // story: data ? data.story : false,
        // key: data ? data.story.id : false,
        story: data.story,
      },
      revalidate: 3600,
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      notFound: true, // sends to 404
    };
  }
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get('cdn/links/', {
    version: 'draft',
    starts_with: 'blog/',
  });
  const { links } = data;

  let paths: any[] = [];

  Object.values(links).forEach((link: any) => {
    const slug = link.slug;
    paths.push({ params: { slug: slug } });
  });

  console.log(paths);

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default BlogPage;
