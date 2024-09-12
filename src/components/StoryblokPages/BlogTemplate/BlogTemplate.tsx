import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import styles from './BlogTemplate.module.scss';

interface Props {
  blok: any;
}
// Create  template folder
// TEmplate folders
const BlogTemplate: FC<Props> = ({ blok }) => {
  const { image, title, subtitle, date, author, body } = blok;
  const formatDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  console.log('date', formatDate);
  return (
    <div className={styles.container} {...storyblokEditable(blok)}>
      <h1 className={[styles.title, styles.hideDesktop].join(' ')}>{title}</h1>
      <div className={styles.featuredImage}>
        <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.contentGrid}>
        <div className={styles.intro}>
          <h1 className={[styles.title, styles.hideMobile].join(' ')}>{title}</h1>
          <p className={styles.author}>
            <span>Written by: </span> <span>{author}</span>
          </p>
          <p className={styles.date}>
            <span>Published: </span>
            <span>{formatDate}</span>
          </p>
        </div>
        <div className={styles.content}>
          <h2 className={styles.subtitle}>{subtitle}</h2>
          <div className={styles.body}>
            {body.map((nestedBlok: any) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTemplate;
