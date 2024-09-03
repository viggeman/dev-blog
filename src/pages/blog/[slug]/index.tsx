import { getStoryblokApi, ISbStoriesParams } from '@storyblok/react';
import { FC } from 'react';
import styles from './BlogPage.module.scss';

interface Props {}

const BlogPage: FC<Props> = ({ data }: any) => {
  console.log('data', data);
  return (
    <div>
      <div className={styles.container}>index fanskap</div>
    </div>
  );
};

export async function getStaticProps({ params }: any) {
  const slug = params.slug;
  console.log('propslug', params);

  let sbParams: ISbStoriesParams = {
    version: 'draft', // or 'published'
  };

  const storyblokApi = getStoryblokApi();

  try {
    let { data } = await storyblokApi.get(`cdn/stories/blog/${slug}`, sbParams);
    return {
      props: {
        // story: data ? data.story : false,
        // key: data ? data.story.id : false,
        story: data.story,
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
    // console.log('found', slug);

    paths.push({ params: { slug: slug } });
    // console.log('paths', paths);
  });

  console.log(paths);

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default BlogPage;
