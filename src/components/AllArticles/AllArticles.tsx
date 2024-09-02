import { getStoryblokApi, storyblokEditable } from '@storyblok/react';
import { FC, useEffect, useState } from 'react';
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';

interface Props {
  blok: any;
}

const AllArticles: FC<Props> = ({ blok }) => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const getArticles = async () => {
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'blog/',
        is_startpage: false,
      });

      setArticles(data.stories);
      console.log('articles', articles);
    };

    getArticles();
  }, []);

  return (
    <>
      <p>{blok.title}</p>
      <div {...storyblokEditable(blok)}>
        {articles.map((article: any) => (
          <ArticleTeaser article={article.content} key={article.uuid} blok={undefined} />
        ))}
      </div>
    </>
  );
};

export default AllArticles;
