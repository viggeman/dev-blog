import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import Button from '../Button/Button';
import styles from './Hero.module.scss';

interface Props {
  blok: any;
}

const Hero: FC<Props> = ({ blok }) => {
  return (
    <div
      {...storyblokEditable(blok)}
      className={`${styles.hero} ${blok.layout === 'constrained' ? styles.constrained : ''}`}
    >
      <div className={styles.textContainer}>
        <h1>{blok.headline}</h1>
        <h2>{blok.subheadline}</h2>
        {blok.link?.cached_url && <Button href={blok.link.cached_url} text={blok.button_text} />}
      </div>
      <Image
        src={blok.background_image.filename}
        alt={blok.background_image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default Hero;
