import { getStoryblokApi, StoryblokComponent, useStoryblokState } from '@storyblok/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  story: any;
}

const Home: React.FC<Props> = ({ story }) => {
  story = useStoryblokState(story);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoryblokComponent blok={story.content} />
    </>
  );
};

export async function getStaticProps() {
  // home is the default slug for the homepage in Storyblok
  let slug = 'home';

  // load the draft version
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
    revalidate: 3600, // revalidate every hour
  };
}

export default Home;
