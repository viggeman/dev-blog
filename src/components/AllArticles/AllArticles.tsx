import { getStoryblokApi } from '@storyblok/react';
import { FC, useEffect, useState } from 'react';

interface Props {
  article: any[];
  blok: any;
}

const AllArticles: FC<Props> = ({ article, blok }) => {
  console.log('article', article);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getArticles = async () => {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'draft', // or 'published'
        starts_with: 'blog/',
        is_startpage: false,
      });

      setArticles((prev) =>
        data.stories.map((article: { content: { slug: any }; slug: any }) => {
          article.content.slug = article.slug;
          return article;
        })
      );
    };
    getArticles();
  }, []);
  console.log('articlesss', articles);
  return (
    <>
      <p>{blok.title}</p>
    </>
  );
};

export default AllArticles;
