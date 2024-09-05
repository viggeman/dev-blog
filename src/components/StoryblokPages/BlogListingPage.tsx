import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  blok: any;
  page: any;
}

const BlogListingPage: FC<Props> = ({ blok, page }) => {
  console.log('bloktemplate', blok);
  console.log('page', page);
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default BlogListingPage;
