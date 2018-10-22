import Layout from '../components/Layout';
import Photo from '../components/Photo';
import getPhotos from '../data/data';

const Index = props => (
  <Layout>
    {
      props.images.map((image, i) => <Photo id={i} data={image} key={i} />)
    }
  </Layout>
);

// Retrieve sample data (JSON)
Index.getInitialProps = async () => ({ images: getPhotos() });

export default Index;
