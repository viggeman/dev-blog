import { storyblokEditable } from '@storyblok/react';
import { FC } from 'react';
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import styles from './ArticleSlider.module.scss';
interface Props {
  blok: any;
}

const ArticleSlider: FC<Props> = ({ blok }) => {
  console.log('blkarticl', blok.featured_articles);
  return (
    <div className={styles.grid} {...storyblokEditable(blok)}>
      {blok.featured_articles.map((article: any) => (
        <ArticleTeaser key={article.uuid} article={article} />
      ))}
    </div>
  );
};

export default ArticleSlider;
