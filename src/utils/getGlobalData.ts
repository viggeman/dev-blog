/*
Get global data from settings in SB
Create a function that will return the global data from the settings in Storyblok.


*/

import { getStoryblokApi, ISbStoriesParams } from '@storyblok/react';

export async function getGlobalData() {
  const storyblokApi = getStoryblokApi();

  let sbParams: ISbStoriesParams = {
    version: 'draft',
    resolve_links: 'url',
  };

  try {
    let { data: headerData } = await storyblokApi.get(`cdn/stories/settings/header`, sbParams);

    console.log('globalData', headerData);

    return headerData.story;
  } catch (error: any) {
    console.error(error.message);
    return {
      notFound: true, // sends to 404
    };
  }
}

export default getGlobalData;
