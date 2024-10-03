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
      <BackgroundGradient background="gradient" />
      {blok.body.map((nestedBlok: any) => (
        <section>
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        </section>
      ))}
    </div>
  );
};

export default StartPage;
