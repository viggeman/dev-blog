import BackgroundGradient from '@/components/BackgroundGradient/BackgroundGradient';
import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { FC } from 'react';
import styles from './StartPage.module.scss';

interface Props {
  blok: any;
}

const StartPage: FC<Props> = ({ blok }) => {
  return (
    <div className={styles.container} {...storyblokEditable(blok)}>
      <BackgroundGradient />
      {blok.body.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default StartPage;
