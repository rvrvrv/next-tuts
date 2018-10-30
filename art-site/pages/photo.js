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
            <div className="comments-inner">
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
            </div>
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
          .display_image {
            width: 50%;
          }
          .display_image img {
            width: 100%; 
            display: block
          }
          .container {
            display: flex;
            width: 100%;
            background: var(--white);
            color: var(--bg);
            box-shadow: 1em 1.5em 4em -2em rgba(0,0,0,1);
          }
          .comments {
            position: relative;
            width: 50%;
            padding: 0 30px;
            display: flex;
            flex-direction: column;
          }
          .comments p {
            margin: 10px 0;
          }
          .comments strong {
            display: block;
          }
          .comments .title {
            border-bottom: 1px solid var(--bg);
            font-size: 1.3em;
            padding-bottom: 10px;
            color: var(--blue);
          }
          .comments-inner {
            flex-grow: 1;
            overflow-y: auto;
          }
          form {
            padding: 5px 0;
            background: var(--white);
            border-top: 1px solid var(--light-gray);
          }
          form input {
            padding: 9px 5px;
            width: 100%;
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
          form input[type="submit"] {
            cursor: pointer;
            transition: background-color .2s;
          }
          form input[type="submit"]:hover {
            background-color: var(--bg);
          }
          form input[type="submit"]:active {
            background-color: black;
          }
        `}
        </style>
      </Layout>
    );
  }
}
