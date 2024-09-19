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

  console.log('button', button);

  return (
    <div className={styles.container} {...storyblokEditable(blok)}>
      <div className={[styles.image, orderSwitch === true ? styles.switched : ''].join(' ')}>
        <div className={styles.imageWrapper}>
          <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {button.map((item: any) => (
          <Button
            label={item.label}
            href={item.link.cached_url}
            linktype={item.link.linktype}
            style="button"
          />
        ))}
      </div>
    </div>
  );
};

export default TwoColumn;
