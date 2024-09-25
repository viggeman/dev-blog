/*

Get data from static props from header
Render header comp

*/
import getGlobalData from '@/utils/getGlobalData';
import { StoryblokComponent, useStoryblokState } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  story: any;
}

const Index: FC<Props> = ({ story }) => {
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story.content} />;
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export async function getStaticProps({ params }: any) {
  const { slug } = params;

  try {
    const globalData = await getGlobalData();
    const story = globalData[slug];

    if (!story) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        story: story,
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

export default Index;
