import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="no"> 
        <Head>
            {/* Favicon */}
            <link rel="icon" href="/helping-hands-logo-icon.svg" />
            <link rel="stylesheet" href="https://use.typekit.net/krv6awl.css"></link> 
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
