import Head from 'next/head';

import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react';

import { FC } from 'react';

interface Props {
  story: any;
}

const Page: FC<Props> = ({ story }) => {
  story = useStoryblokState(story);
  console.log('story', story);

  return (
    <div>
      <Head>
        <title>{story ? story.name : 'My Site'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{story ? story.name : 'MySite'}</h1>
      <StoryblokComponent blok={story.content} />
    </div>
  );
};

export async function getStaticProps({ params }: { params: { slug: any } }) {
  let slug = params.slug ? params.slug.join('/') : 'home';
  console.log('skug', slug);

  let sbParams: any = {
    version: 'draft', // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get('cdn/links/', {
    version: 'draft',
  });

  let paths: any[] = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === 'home') {
      return;
    }

    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split('/');

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export default Page;
