/*
Fetch all article slugs from Storyblok in getStaticPaths
Fetch all blog articles content from Storyblok on getStaticProps
Render <ArticleTeaser /> for each blog article found
*/

import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import { getStoryblokApi, ISbStoriesParams } from '@storyblok/react';
import { FC } from 'react';
import styles from './blog.module.scss';

interface Props {
  data: any;
}

const index: FC<Props> = ({ data }) => {
  const { stories } = data;

  return (
    <div className={styles.grid}>
      {stories.map((article: any) => (
        <ArticleTeaser article={article} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  let sbParams: ISbStoriesParams = {
    version: 'draft', // or 'published'
    starts_with: 'blog',
    sort_by: 'created_at:asc',
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories`, sbParams);

  return {
    props: {
      data: data ? data : null,
    },
    revalidate: 3600,
  };
}

export default index;
