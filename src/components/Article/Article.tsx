import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import styles from './Article.module.scss';

interface Props {
  article: any; // Rename to content
}

const Article: FC<Props> = ({ article }) => {
  return (
    <article {...storyblokEditable(article)} className={styles.contentWrapper}>
      <Image
        src={article.image.filename}
        alt={article.image.alt}
        width={1200}
        height={600}
        style={{ objectFit: 'cover' }}
        className={styles.featuredImage}
      />
      {/*
      // Create Article types separate file
      // Create a body div for SB content
      // Map through body and render/return SB component
      */}
      <div className={styles.textContent}>
        <h1 className={styles.title}>{article.title}</h1>
        <h2 className={styles.subtitle}>{article.subtitle}</h2>
        <span className={styles.date}>{article.date}</span>
        <h3 className={styles.author}>{article.author}</h3>
      </div>
      <div>
        {article.body.map((nestedBlok: any) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </article>
  );
};

export default Article;
