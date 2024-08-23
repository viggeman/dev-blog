import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { FC } from 'react';

interface Props {
  blok: any;
}

const Grid: FC<Props> = ({ blok }) => {
  return (
    <div className="grid" {...storyblokEditable(blok)}>
      {blok.columns.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;
