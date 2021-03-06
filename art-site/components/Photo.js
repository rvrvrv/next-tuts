import Link from 'next/link';

export default props => (
  <div className="photoComponent">
    <div>
      <Link href={{ pathname: '/photo', query: { id: props.id } }}>
        <img src={`/static/art/${props.data.image}.jpg`} alt="" />
      </Link>
      <div className="meta">
        <p className="title">{props.data.title}</p>
      </div>
    </div>
    <style>
      {`
        .photoComponent {
          max-width: 400px;
          margin: 2%;
          background: var(--white);
          color: var(--bg);
          box-shadow: 0 1em 2em #002;
          overflow: hidden;
          text-align: center;
          font-weight: bold;
        }
        img {
          width: 80%;
          margin: 10% auto 2%;
          cursor: pointer;
        }
        .title {
          margin-bottom: .8em;
        }
      `}
    </style>
  </div>
);
