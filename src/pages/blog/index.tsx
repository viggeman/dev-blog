import getGlobalData from '@/utils/getGlobalData';
import {
  getStoryblokApi,
  ISbStories,
  ISbStoriesParams,
  StoryblokComponent,
} from '@storyblok/react';
import { FC } from 'react';

interface Props {
  blogData: any[];
  pageData: any;
  pagination: any;
}

const postsPerPage = 6;

const BlogIndex: FC<Props> = ({ blogData, pageData, pagination }) => {
  return (
    <>
      <StoryblokComponent blok={pageData.content} articles={blogData} pagination={pagination} />
    </>
  );
};

export async function getStaticProps() {
  const storyblokApi = getStoryblokApi();

  const blogParams: ISbStoriesParams = {
    version: 'draft',
    content_type: 'blog_page',
    resolve_links: 'url',
    per_page: postsPerPage,
  };
  const pageParams: ISbStoriesParams = {
    version: 'draft',
  };

  try {
    const { data: blogData } = await storyblokApi.get(`cdn/stories`, blogParams);
    const { data: pageData } = await storyblokApi.get(`cdn/stories/blog`, pageParams);

    const { data: blogPostLinks }: ISbStories = await storyblokApi.get(`cdn/links`, {
      version: 'draft',
      starts_with: 'blog/',
    });

    // Filter out the BlogListingIndex page
    const filteredBlogPostLinks = Object.values(blogPostLinks.links).filter(
      (link: any) => !link.is_startpage
    );

    const totalPosts = Object.keys(filteredBlogPostLinks).length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const globalData = await getGlobalData();

    return {
      props: {
        blogData: blogData.stories,
        pageData: pageData.story,
        globalData: globalData,
        pagination: {
          totalPosts: totalPosts,
          totalPages: totalPages,
          postsPerPage: postsPerPage,
        },
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
