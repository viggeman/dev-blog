import Image from 'next/image';
import { FC } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';
import styles from './Article.module.scss';

interface Props {
  article: any;
}

const Article: FC<Props> = ({ article }) => {
  console.log('article', article);
  return (
    <div className={styles.contentWrapper}>
      <Image
        src={article.image.filename}
        alt={article.image.alt}
        width={1200}
        height={600}
        style={{ objectFit: 'cover' }}
        className={styles.featuredImage}
      />
      <div className={styles.textContent}>
        <h1 className={styles.title}>{article.title}</h1>
        <h2 className={styles.subtitle}>{article.subtitle}</h2>
        <span className={styles.date}>{article.date}</span>
        <h3 className={styles.author}>{article.author}</h3>
        <div className={styles.content}>{render(article.content)}</div>
      </div>
    </div>
  );
};

export default Article;
