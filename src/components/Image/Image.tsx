import { storyblokEditable } from '@storyblok/react';
import Image from 'next/image';
import { FC } from 'react';

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

const ImageComponent: FC<Props> = ({ blok }) => {
  const { title, caption, image } = blok;
  return (
    <div {...storyblokEditable(blok)}>
      <h3>{title}</h3>
      <Image src={image.filename} alt={image.alt} width={500} height={300} />
      <p>{caption}</p>
    </div>
  );
};

export default ImageComponent;
