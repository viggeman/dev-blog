import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './ArticleTeaser.module.scss';

interface Props {
  article: any;
}

const ArticleTeaser: FC<Props> = ({ article }) => {
  const teaserContent = article.content;
  return (
    <div className={styles.container}>
      <div>
        <Image
          src={teaserContent.image.filename}
          alt={teaserContent.image.alt}
          width={1200}
          height={600}
          style={{ objectFit: 'cover' }}
          className={styles.featuredImage}
        />
        <h2>{teaserContent.title}</h2>
        <div>{teaserContent.teaser}</div>
        <Link href={`/blog/${article.slug}`}>Read More »</Link>
      </div>
    </div>
  );
};

export default ArticleTeaser;
