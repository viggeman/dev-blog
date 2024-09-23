import Layout from '@/components/Layout/Layout';
import { components } from '@/components/storyBlokComponents';
import '@/styles/globals.scss';
import { apiPlugin, storyblokInit } from '@storyblok/react';
import type { AppProps } from 'next/app';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

export default function App({ Component, pageProps }: AppProps) {
  const globalData = pageProps.globalData ? pageProps.globalData : null;
  return (
    <Layout globalData={globalData}>
      <Component {...pageProps} />
    </Layout>
  );
}
