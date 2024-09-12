import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';
import styles from './BlogImage.module.scss';

interface Props {
  blok: {
    title: string;
    caption: string;
    image: {
      filename: string;
      alt: string;
    };
  };
}
// REname to BlogImage
const ImageComponent: FC<Props> = ({ blok }) => {
  const { caption, image } = blok;
  return (
    <div {...storyblokEditable(blok)}>
      <div className={styles.imageWrapper}>
        <Image src={image.filename} alt={image.alt} layout="fill" objectFit="cover" />
        <div className={styles.imageCaption}>
          <p>{caption}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
