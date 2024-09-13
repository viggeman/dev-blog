import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './ArticleTeaser.module.scss';

interface Props {
  article: any;
}

const ArticleTeaser: FC<Props> = ({ article }) => {
  const { image, title, teaser, category } = article.content;
  console.log('category', article);

  return (
    <article className={styles.sliderItem}>
      <div className={styles.imageWrapper}>
        <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.contentTeaser}>
        {category && (
          <div className={styles.tagContainer}>
            {category.map((item: any, index: number) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        )}
        <h2>{title}</h2>
        <p>{teaser}</p>
      </div>
      <Link className={styles.floatingLink} href={`/blog/${article.slug}`} />
    </article>
  );
};

export default ArticleTeaser;
