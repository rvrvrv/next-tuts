import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Layout from '../components/Layout';

const Show = props => (
  <>
    <Head>
      <title>{props.show.name}</title>
    </Head>
    <Layout>
      <h1>{props.show.name}</h1>
      <p>{props.show.summary.replace(/<[/]?(p|b)>/g, '')}</p>
      <img src={props.show.image.medium} alt={props.show.name} />
    </Layout>
  </>
);

Show.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Show;
