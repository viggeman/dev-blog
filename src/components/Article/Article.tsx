import Image from 'next/image';
import { FC } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';
import styles from './Article.module.scss';

interface Props {
  blok: any;
}

const Article: FC<Props> = ({ blok }) => {
  return (
    <div className={styles.contentWrapper}>
      <Image
        src={blok.image.filename}
        alt={blok.image.alt}
        width={1200}
        height={600}
        style={{ objectFit: 'cover' }}
        className={styles.featuredImage}
      />
      <div className={styles.textContent}>
        <h1 className={styles.title}>{blok.title}</h1>
        <h2 className={styles.subtitle}>{blok.subtitle}</h2>
        <span className={styles.date}>{blok.date}</span>
        <h3 className={styles.author}>{blok.author}</h3>
        <div className={styles.content}>{render(blok.content)}</div>
      </div>
    </div>
  );
};

export default Article;
