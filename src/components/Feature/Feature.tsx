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
        <Image
          src={blok.image.filename}
          alt="feature"
          width={500}
          height={300}
        />
        <h1>{blok.name}</h1>
      </div>
    </div>
  );
};

export default Feature;

{
  /* <div className="column feature" {...storyblokEditable(blok)}>
  <div className="p-6">
    <h1>{blok.name}</h1>
    <div className="mt-4">
      <a
        href="#"
        className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
        title="read more"
      >
        {' '}
        Read More »{' '}
      </a>
    </div>
  </div>
</div>; */
}
