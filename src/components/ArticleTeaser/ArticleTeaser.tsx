import Link from 'next/link';
import { FC } from 'react';
import styles from './ArticleTeaser.module.scss';

interface Props {
  article: any;
}

const ArticleTeaser: FC<Props> = ({ article }) => {
  return (
    <div className={styles.container}>
      <div>
        <img src={article.content.image.filename} alt="hej" />
        <h2>{article.name}</h2>
        <div>{article.content.teaser}</div>
        <div>
          <Link href={`/blog/${article.slug}`}>Read More »</Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleTeaser;
