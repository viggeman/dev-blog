import ArticleSlider from '@/components/ArticleSlider/ArticleSlider';
import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import ImageComponent from '@/components/BlogImage/BlogImage';
import ContactGrid from '@/components/ContactGrid/ContactGrid';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Layout from '@/components/Layout/Layout';
import LinkComponent from '@/components/Link/Link';

import RichText from '@/components/RichText/RichText';
import BlogListingPage from '@/components/StoryblokPages/BlogListingTemplate/BlogListingPage';
import BlogTemplate from '@/components/StoryblokPages/BlogTemplate/BlogTemplate';
import StartPage from '@/components/StoryblokPages/StartTemplate/StartPage';
import TwoColumn from '@/components/TwoColumn/TwoColumn';
import '@/styles/globals.scss';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import type { AppProps } from 'next/app';

const components = {
  start_page: StartPage,
  blog_page: BlogTemplate,
  blog_listing_page: BlogListingPage,
  article_slider: ArticleSlider,
  hero: Hero,
  articleteaser: ArticleTeaser,
  component_blog_image: ImageComponent,
  component_link: LinkComponent,
  component_rich_text: RichText,
  two_column: TwoColumn,
  contact_grid: ContactGrid,
  header: Header,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

export default function App({ Component, pageProps }: AppProps) {
  console.log('pageProps', pageProps);
  // if we have a global data object we can pass it to the layout
  const globalData = pageProps.globalData ? pageProps.globalData : null;
  return (
    <Layout globalData={globalData}>
      <Component {...pageProps} />
    </Layout>
  );
}
