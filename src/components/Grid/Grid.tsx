import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { FC } from 'react';
import styles from './Grid.module.scss';
interface Props {
  blok: any;
}

const Grid: FC<Props> = ({ blok }) => {
  return (
    <div className={styles.grid} {...storyblokEditable(blok)}>
      {blok.columns.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;
