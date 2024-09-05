import { FC } from 'react';
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';

interface Props {
  blok: any;
  pages: any[];
}

const BlogListingPage: FC<Props> = ({ blok }) => {
  console.log('bloktemplate', blok);
  return (
    // <main {...storyblokEditable(blok)}>
    //   {blok.body.map((nestedBlok: any) => (
    //     <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    //   ))}
    // </main>
    <div>
      {blok.map((article: any) => (
        <ArticleTeaser article={article} key={article.id} />
      ))}
    </div>
  );
};

export default BlogListingPage;
