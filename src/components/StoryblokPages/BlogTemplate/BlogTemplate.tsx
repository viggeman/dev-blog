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
  return (
    <main className={styles.contentWrapper} {...storyblokEditable(blok)}>
      <Image
        src={image.filename}
        alt={image.alt}
        width={1200}
        height={600}
        style={{ objectFit: 'cover' }}
        className={styles.featuredImage}
      />
      <div className={styles.textblok}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
        <span className={styles.date}>{date}</span>
        <h3 className={styles.author}>{author}</h3>
      </div>
      {body.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default BlogTemplate;
