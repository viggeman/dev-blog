import { storyblokEditable } from '@storyblok/react';
import Link from 'next/link';
import { FC } from 'react';
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import styles from './ArticleSlider.module.scss';

interface Props {
  blok: any;
}

const ArticleSlider: FC<Props> = ({ blok }) => {
  const { title, featured_articles } = blok;
  return (
    <div className={styles.articleSlider} {...storyblokEditable(blok)}>
      <div className={styles.sectionHeader}>
        <span>{title}</span>
        <Link href="/blog">All posts</Link>
      </div>
      <div className={styles.sliderItems}>
        {featured_articles.map((article: any) => (
          <ArticleTeaser key={article.uuid} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleSlider;
