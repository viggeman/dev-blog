import getGlobalData from '@/utils/getGlobalData';
import {
  getStoryblokApi,
  ISbStoriesParams,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react';
import { FC } from 'react';

interface Props {
  story: any; // extend with types from SB
}

const Blog: FC<Props> = ({ story }) => {
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story.content} />;
};

export async function getStaticProps({ params }: any) {
  const slug = params.slug;

  console.log('slug', params);

  let sbParams: ISbStoriesParams = {
    version: 'draft', // or 'published'
    resolve_links: 'url',
  };

  const storyblokApi = getStoryblokApi();

  try {
    let { data } = await storyblokApi.get(`cdn/stories/blog/${slug}`, sbParams);
    const globalData = await getGlobalData();

    return {
      props: {
        story: data.story,
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

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default Blog;
