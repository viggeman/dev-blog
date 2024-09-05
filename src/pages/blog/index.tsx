import { getStoryblokApi, ISbStoriesParams, StoryblokComponent } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  blogData: any[];
  pageData: any;
}

const BlogIndex: FC<Props> = ({ blogData, pageData }) => {
  // blogData = useStoryblokState(blogData);
  console.log('blogdata', blogData);
  console.log('pagedarta', pageData);

  return (
    <>
      <StoryblokComponent blok={pageData.story} />
      {/* {blogData.map((article) => (
        <ArticleTeaser key={article.uuid} article={article} />
      ))} */}
    </>
  );
};

export async function getStaticProps() {
  const storyblokApi = getStoryblokApi();

  let blogParams: ISbStoriesParams = {
    version: 'draft',
    content_type: 'blog_page',
  };
  let { data: blogData } = await storyblokApi.get(`cdn/stories`, blogParams);

  let pageParams: ISbStoriesParams = {
    version: 'draft',
    content_type: 'blog_listing_page',
    is_startpage: true,
  };
  let { data: pageData } = await storyblokApi.get(`cdn/stories`, pageParams);

  return {
    props: {
      blogData: blogData.stories,
      pageData: pageData,
    },
    revalidate: 3600,
  };
}

export default BlogIndex;
