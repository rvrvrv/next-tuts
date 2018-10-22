import Link from 'next/link';

export default props => (
  <div className="photoComponent">
    <div style={{ flex: '1 0 auto' }}>
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
          display: flex;
          flex-direction: column;
          width: 29%;
          float: left;
          margin: 2%;
          background: var(--white);
          color: var(--bg);
          box-shadow: 0 1em 2em #002;
          overflow: auto;
          text-align: center;
          font-weight: bold;
        }
        img {
          width: 80%;
          margin: 10%;
        }
        .title {
          margin-bottom: 10px;
        }
      `}
    </style>
  </div>
);
