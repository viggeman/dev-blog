import { getStoryblokApi, ISbStoriesParams } from '@storyblok/react';

export async function getBlogPosts(index: any) {
  console.log('index', index);
  const storyblokApi = getStoryblokApi();

  const sbParams: ISbStoriesParams = {
    version: 'draft',
    content_type: 'blog_page',
    resolve_links: 'url',
    per_page: 12,
    page: index,
  };

  try {
    const { data: blogData } = await storyblokApi.get('cdn/stories', sbParams);
    console.log('blogData', blogData);

    return blogData.stories;
  } catch (error: any) {
    console.error('Error fetching blog posts:', error.message);
    return {
      notFound: true, // sends to 404
    };
  }
}

export default getBlogPosts;
