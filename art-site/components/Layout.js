import Link from 'next/link';
import Head from 'next/head';

export default ({ children, title = 'Art Gallery' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="app">
      <header>
        <h1><Link href={{ pathname: '/' }}><a>gallery</a></Link></h1>
        <h2>Interesting Artwork</h2>
      </header>
      { children }
      <footer />
      <style global jsx>
        {`
          :root {
            --bg: #182952;
            --blue: #2b3595;
            --green: #65C5D9; 
            --white: #F4F5F7;
            --light-gray: #EAEEEF;
          }
          @import url('https://fonts.googleapis.com/css?family=Dancing+Script');
          @import url('https://fonts.googleapis.com/css?family=Changa:800');
          @media screen {
            * , *:after, *:before {
              box-sizing: border-box;
            }
          }
          * {
            margin: 0;
            padding: 0;
          }
          html { 
            height: 100%;
          }
          body { 
            height: 100%;
            font-family: sans-serif;
            background: var(--bg); 
            color: var(--white);
          }
          .app {
            width: 100%;
            margin: auto;
            overflow-x: hidden;
          }
      `}
      </style>
      <style jsx>
        {`
          header {
            text-align: center;
            user-select: none;
            margin-bottom: 3em;
          }
          header h1 a {
            font-family: 'Changa', sans-serif;
            font-size: 30vw;
            line-height: .7;
            color: var(--bg);
            text-shadow: var(--blue) 0 0 50px;
            letter-spacing: -15px;
            display: inline-block;
            text-decoration: none;
          }
          h2 {
            font-size: 5vw;
            color: var(--white);
            text-shadow: none;
            letter-spacing: normal;
            font-weight: normal;
            font-family: 'Dancing Script', cursive;
            position: absolute;
            top: 12%;
            left: 45%;
          }
          footer {
            clear: both;
            display: inline-block;
            width: 100%;
            margin-top: 200px;
            text-align: center;
            padding: 4px 0;
          }
        `}
      </style>
    </div>
  </div>
);
