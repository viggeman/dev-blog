import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import ImageComponent from '@/components/BlogImage/BlogImage';
import Feature from '@/components/Feature/Feature';
import Grid from '@/components/Grid/Grid';
import Hero from '@/components/Hero/Hero';
import Layout from '@/components/Layout/Layout';
import LinkComponent from '@/components/Link/Link';
import RichText from '@/components/RichText/RichText';
import BlogListingPage from '@/components/StoryblokPages/BlogListingTemplate/BlogListingPage';
import BlogTemplate from '@/components/StoryblokPages/BlogTemplate/BlogTemplate';
import StartPage from '@/components/StoryblokPages/StartTemplate/StartPage';
import Teaser from '@/components/Teaser/Teaser';
import '@/styles/globals.scss';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import type { AppProps } from 'next/app';
const components = {
  start_page: StartPage,
  blog_page: BlogTemplate,
  blog_listing_page: BlogListingPage,
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  hero: Hero,
  articleteaser: ArticleTeaser,
  component_blog_image: ImageComponent,
  component_link: LinkComponent,
  component_rich_text: RichText,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
