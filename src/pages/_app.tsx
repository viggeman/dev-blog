import Feature from '@/components/Feature';
import Grid from '@/components/Grid';
import Page from '@/components/Page';
import Teaser from '@/components/Teaser';
import '@/styles/globals.css';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import type { AppProps } from 'next/app';

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
};

storyblokInit({
  accessToken: 'mPsdaTNEI1O7WuY5bKDHwgtt',
  use: [apiPlugin],
  components,
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
