import { getStoryblokApi, ISbStoriesParams } from '@storyblok/react';

export async function getBlogPosts(postsPerPage: number, page?: any) {
  const storyblokApi = getStoryblokApi();

  const sbParams: ISbStoriesParams = {
    version: 'draft',
    content_type: 'blog_page',
    resolve_links: 'url',
    starts_with: 'blog/',
    per_page: postsPerPage,
    page: page,
  };

  try {
    const { data: blogData } = await storyblokApi.get('cdn/stories', sbParams);
    return blogData.stories;
  } catch (error: any) {
    console.error('Error fetching blog posts:', error.message);
    return {
      notFound: true, // sends to 404
    };
  }
}

export default getBlogPosts;
