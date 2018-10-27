import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Photo from '../components/Photo';

export default class extends Component {
  static async getInitialProps() {
    const images = await (await fetch('http://localhost:4000/photos')).json();
    return { images };
  }

  componentWillMount() {
    this.setState({
      images: this.props.images
    });
  }

  render() {
    return (
      <Layout>
        {
          this.state.images.map((image, i) => <Photo id={i + 1} data={image} key={i} />)
        }
      </Layout>
    );
  }
}
