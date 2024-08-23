import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  blok: any;
}

const Page: FC<Props> = ({ blok }) => {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Page;
