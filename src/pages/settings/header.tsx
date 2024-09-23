/*

Get data from static props from header
Render header comp

*/
import getGlobalData from '@/utils/getGlobalData';
import { StoryblokComponent, useStoryblokState } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  globalData: any;
}

const Header: FC<Props> = ({ globalData }) => {
  globalData = useStoryblokState(globalData);
  return (
    <div>
      <StoryblokComponent blok={globalData.content} />
    </div>
  );
};

export async function getStaticProps() {
  // const storyblokApi = getStoryblokApi();

  // let sbParams: ISbStoriesParams = {
  //   version: 'draft',
  //   resolve_links: 'url',
  // };

  // try {
  //   let { data: headerData } = await storyblokApi.get(`cdn/stories/settings/header`, sbParams);

  //   return {
  //     props: {
  //       headerData: headerData.story,
  //     },
  //     revalidate: 3600,
  //   };
  // } catch (error: any) {
  //   console.error(error.message);
  //   return {
  //     notFound: true, // sends to 404
  //   };
  // }
  try {
    const globalData = await getGlobalData();

    return {
      props: {
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

export default Header;
