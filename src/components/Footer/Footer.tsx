import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { FC } from 'react';
import styles from './Footer.module.scss';

interface Props {
  blok: any;
}

const Footer: FC<Props> = ({ blok }) => {
  const { footer_column } = blok;
  console.log('footer col', footer_column);

  return (
    <footer {...storyblokEditable(blok)}>
      <div className={styles.container}>
        {footer_column.map((column: any) => {
          return (
            <div className={styles.columnContainer} key={column._uid}>
              <h2>{column.title}</h2>
              {column.content.map((nestedBlok: any) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
