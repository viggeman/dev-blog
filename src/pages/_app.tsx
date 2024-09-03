import Article from '@/components/Article/Article';
import ArticleTeaser from '@/components/ArticleTeaser/ArticleTeaser';
import Feature from '@/components/Feature/Feature';
import Grid from '@/components/Grid/Grid';
import Hero from '@/components/Hero/Hero';
import Layout from '@/components/Layout/Layout';
import Page from '@/components/Page';
import Teaser from '@/components/Teaser';
import '@/styles/globals.scss';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import type { AppProps } from 'next/app';

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  hero: Hero,
  article: Article,
  articleteaser: ArticleTeaser,
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
