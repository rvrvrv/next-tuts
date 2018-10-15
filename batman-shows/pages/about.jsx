import Head from 'next/head';
import Layout from '../components/Layout';

export default () => (
  <>
    <Head>
      <title>About: Batman TV Shows</title>
    </Head>
    <Layout>
      <p>
        This Next.js app displays Batman info from the
        {' '}
        <a
          href="http://www.tvmaze.com/api"
          target="_blank"
          rel="noopener noreferrer"
        >
            tvMaze API
        </a>
        {'.'}
      </p>
    </Layout>
  </>
);
