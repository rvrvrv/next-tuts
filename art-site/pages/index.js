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

  LikesEntry(id) {
    const { images } = this.state;
    const image = images.find(img => img.id === id);
    image.likes += 1;
    this.setState({
      images
    });
    fetch(`http://localhost:4000/photos/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(image)
    });
  }

  render() {
    return (
      <Layout>
        {
          this.state.images.map((image, i) => (
            <Photo
              id={i + 1}
              data={image}
              LikesEntry={this.LikesEntry.bind(this)}
              key={i}
            />
          ))
        }
      </Layout>
    );
  }
}
