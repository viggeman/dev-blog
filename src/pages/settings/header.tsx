/*

Get data from static props from header
Render header comp

*/
import Header from '@/components/Header/Header';
import getGlobalData from '@/utils/getGlobalData';
import { useStoryblokState } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  story: any;
}

const Index: FC<Props> = ({ story }) => {
  story = useStoryblokState(story);
  return <Header blok={story.content} />;
};

export async function getStaticProps() {
  try {
    const globalData = await getGlobalData();

    return {
      props: {
        story: globalData.header,
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
