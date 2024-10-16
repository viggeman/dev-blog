import Image from 'next/image';
import { FC } from 'react';
import styles from './FeaturedHighlight.module.scss';

interface Props {
  highlight: any;
}

const FeaturedHighlight: FC<Props> = ({ highlight }) => {
  const { title, image, order } = highlight;
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <h2>{title}</h2>
      </div>
      <div className={styles.imageWrapper}>
        <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default FeaturedHighlight;
