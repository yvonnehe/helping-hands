import Head from "next/head";

const NextHead = ({ title, description, image = "/helping-hands-two-boys.jpg", url = "https://helpinghands.no" }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="fadderordning, hjelpe barn, veldedighet, Tanzania, skolegang" />
      <meta name="author" content="Helping Hands Norway" />

      {/* Favicon */}
      {/* <link rel="icon" href="/helping-hands-logo-icon.svg" />
      <link rel="stylesheet" href="https://use.typekit.net/krv6awl.css"></link>  */}

      {/* Open Graph Meta Tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="nb_NO" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      
      {/* <meta
        property="og:image"
        content="/helping-hands-two-boys.jpg"
        key="ogimage"
      /> */}
    </Head>
  );
};

export default NextHead;