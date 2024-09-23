import getGlobalData from '@/utils/getGlobalData';
import { getStoryblokApi, ISbStoriesParams, StoryblokComponent } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  blogData: any[];
  pageData: any;
}

const BlogIndex: FC<Props> = ({ blogData, pageData }) => {
  return (
    <>
      <StoryblokComponent blok={pageData.content} articles={blogData} />
    </>
  );
};

export async function getStaticProps() {
  const storyblokApi = getStoryblokApi();

  let blogParams: ISbStoriesParams = {
    version: 'draft',
    content_type: 'blog_page',
    resolve_links: 'url',
  };
  let pageParams: ISbStoriesParams = {
    version: 'draft',
  };

  try {
    let { data: blogData } = await storyblokApi.get(`cdn/stories`, blogParams);
    let { data: pageData } = await storyblokApi.get(`cdn/stories/blog`, pageParams);

    let globalData = await getGlobalData();

    return {
      props: {
        blogData: blogData.stories,
        pageData: pageData.story,
        globalData: globalData,
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

export default BlogIndex;
