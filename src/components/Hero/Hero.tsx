import { storyblokEditable } from '@storyblok/react';
import { default as Image } from 'next/image';
import { FC } from 'react';
import styles from './Hero.module.scss';

interface Props {
  blok: any;
}

const Hero: FC<Props> = ({ blok }) => {
  const { background_image, background_alt, headline } = blok;
  return (
    <div
      {...storyblokEditable(blok)}
      className={`${styles.hero} ${blok.layout === 'constrained' ? styles.constrained : ''}`}
    >
      <div className={styles.textContainer}>
        <div className={styles.textWrapper}>
          <h1>{headline}</h1>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src={background_image.filename}
          alt={background_image.alt}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Hero;
