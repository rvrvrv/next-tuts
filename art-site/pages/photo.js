import Layout from '../components/Layout';
import getPhotos from '../data/data';

const PhotoPage = (props) => {
  const photo = props.image;
  return (
    <Layout>
      <div className="container">
        <div className="display_image">
          <img src={`/static/art/${photo.image}.jpg`} alt="" />
        </div>
        <div className="comments">
          <p className="title">{photo.title}</p>
          {
          photo.comments.map((comment, i) => (
            <p key={i}>
              <strong>{comment.user}:</strong>{comment.body}
            </p>
          ))
        }
          <form className="comment-form">
            <input type="text" placeholder="Author" />
            <input type="text" placeholder="Comment..." />
            <input type="submit" disabled />
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
};

PhotoPage.getInitialProps = async ({ query }) => {
  const { id } = { ...query };
  const image = getPhotos().find(p => p.id === parseInt(id, 10));
  return { image };
};

export default PhotoPage;
