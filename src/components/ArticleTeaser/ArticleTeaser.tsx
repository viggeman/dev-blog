import Link from 'next/link';
import { FC } from 'react';
import styles from './ArticleTeaser.module.scss';

interface Props {
  article: any;
  blok: any;
}

const ArticleTeaser: FC<Props> = ({ article, blok }) => {
  return (
    <div className={styles.container}>
      <div className="p-6">
        <img
          className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
          src={article.image.filename}
          alt={blok.image.alt}
        />
        <h2>{article.title}</h2>
        <div>{article.teaser}</div>
        <div>
          <Link href={`/blog/${article.slug}`}>
            <a title="read more">Read More »</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleTeaser;
