import Head from "next/head";

const NextHead = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/helping-hands-logo-icon.svg" />
      <link rel="stylesheet" href="https://use.typekit.net/krv6awl.css"></link> 
      <meta
        name="description"
        content={description}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        property="og:image"
        content="/helping-hands-two-boys.jpg"
        key="ogimage"
      />
      <meta property="og:locale" content="nb_NO" />
      <meta name="keywords" content="fadderordning, hjelpe barn, veldedighet, Tanzania, skolegang" />
    </Head>
  );
};

export default NextHead;