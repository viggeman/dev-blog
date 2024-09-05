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
      <div className={styles.intro}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.author}>Written by: {author}</p>
        <p className={styles.date}>Published: {date}</p>
      </div>
      <div className={styles.content}>
        <h2 className={styles.subtitle}>{subtitle}</h2>
        <div className={styles.richText}>
          {body.map((nestedBlok: any) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogTemplate;
