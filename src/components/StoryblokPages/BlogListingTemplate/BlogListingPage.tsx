import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import styles from './BlogListingPage.module.scss';

interface Props {
  blok: any;
  articles: any;
}

const BlogListingPage: FC<Props> = ({ blok, articles }) => {
  console.log('bloktemplate', blok);
  console.log('pages', articles);
  return (
    <div {...storyblokEditable(blok)}>
      <Image
        src={blok.image.filename}
        alt={blok.image.alt}
        width={1200}
        height={600}
        style={{ objectFit: 'cover' }}
        className={styles.featuredImage}
      />
      <div className={styles.grid}>
        {articles.map((article: any) => (
          <ArticleTeaser key={article.uuid} article={article} />
        ))}
      </div>
    </div>
  );
};

export default BlogListingPage;
