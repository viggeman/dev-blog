import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import Button from '../Button/Button';
import styles from './TwoColumn.module.scss';

interface Props {
  blok: any;
}

const TwoColumn: FC<Props> = ({ blok }) => {
  const { image, button, subtitle, title, orderSwitch } = blok;
  console.log('bloktwocol', orderSwitch);
  const { label, link } = button[0];
  const test = false;

  console.log('button', label, link);
  return (
    <div className={styles.container} {...storyblokEditable(blok)}>
      <div className={`${styles.image} ${orderSwitch === true ? styles.switched : ''}`}>
        <div className={styles.imageWrapper}>
          <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <Button button={{ label: label, href: link.cached_url }} />
        </div>
      </div>
    </div>
  );
};

export default TwoColumn;
