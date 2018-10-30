import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

export default class extends Component {
  constructor(props) {
    super(props);
    this.authorRef = React.createRef();
    this.commentRef = React.createRef();
  }

  static async getInitialProps({ query }) {
    const { id } = { ...query };
    const image = await (await fetch(`http://localhost:4000/photos/${id}`)).json();
    return { image };
  }

  componentWillMount() {
    this.setState({
      image: this.props.image
    });
  }

  submitComment(e) {
    e.preventDefault();
    // Handle data from .comment-form
    const user = this.authorRef.current.value.trim();
    const body = this.commentRef.current.value.trim();
    // Validate
    if (!user || !body) return;
    // Update database
    fetch(`http://localhost:4000/photos/${this.state.image.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.image)
    })
      .then(() => {
        // Update state
        const { comments } = this.state.image;
        comments.push({ user, body });
        this.setState({ comments });
      });
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <div className="display_image">
            <img src={`/static/art/${this.state.image.image}.jpg`} alt="" />
          </div>
          <div className="comments">
            <p className="title">{this.state.image.title}</p>
            {
            this.state.image.comments.map((comment, i) => (
              <p key={i}>
                <strong>
                  {comment.user}
:
                </strong>
                {comment.body}
              </p>
            ))
          }
            <form
              className="comment-form"
              onSubmit={e => this.submitComment(e)}
            >
              <input type="text" ref={this.authorRef} placeholder="Author" />
              <input type="text" ref={this.commentRef} placeholder="Comment..." />
              <input type="submit" />
            </form>
          </div>
        </div>
        <style>
          {`
          form {
            padding: 5px;
            background: var(--white);
            border-top: 1px solid var(--light-gray);
            overflow: auto;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
          }
          form input {
            padding: 9px 3px;
            width: 90%;
            margin: 5px auto;
            display: block;
            background-color: var(--blue);
            border: none;
            outline: none;
            color: var(--white);
          }
          form input::placeholder {
            color: var(--light-gray);
          }
          form a {
            text-decoration: none;
            margin-top: 5px;
            float: left;
            width: 50%;
            text-align: center;
            padding: 9px 0;
            margin-top: 10px;
            color: var(--white);
          }
          .title {
            border-bottom: 1px solid var(--bg);
            font-size: 1.3em;
            padding-bottom: 10px;
            margin-bottom: 20px;
            display: inline-block;
            color: var(--blue);
          }
          .comments{
            padding: 30px;
          }
          .comments p {
            margin: 10px 0;
          }
          .comments strong {
            display: block;
          }
          .display_image{
            width: 50%;
          }
          .display_image img {
            width: 100%; 
            display: block
          }
          .comments {
            position: relative;
            width: 50%;
          }
          .container {
            display: flex;
            width: 100%;
            background: var(--white);
            color: var(--bg);
            box-shadow: 1em 1.5em 4em -2em rgba(0,0,0,1);
          }
        `}
        </style>
      </Layout>
    );
  }
}
