import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import styles from './Feature.module.scss';

interface Props {
  blok: any;
}

const Feature: FC<Props> = ({ blok }) => {
  return (
    <div className={styles.feature} {...storyblokEditable(blok)}>
      <div>
        <Image src={blok.image.filename} alt="feature" width={500} height={300} />
        <h1>{blok.name}</h1>
      </div>
    </div>
  );
};

export default Feature;
