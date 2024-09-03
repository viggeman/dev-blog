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
  return (
    <div>
      <h3>{blok.title}</h3>
      <Image src={blok.image.filename} alt={blok.image.alt} width={500} height={300} />
      <p>{blok.caption}</p>
    </div>
  );
};

export default ImageComponent;
