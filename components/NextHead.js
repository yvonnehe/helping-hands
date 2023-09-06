import Head from "next/head";

const NextHead = () => {
  return (
    <Head>
      <title>Helping Hands Norway</title>
      <link rel="icon" href="/helping-hands-logo-icon.svg" />
      <link rel="stylesheet" href="https://use.typekit.net/krv6awl.css"></link>
      <meta
        name="description"
        content="Helping Hands er en veldedig organisasjon som jobber med å få barn og ungdom i skolegang i Tanzania."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        property="og:image"
        content="/helping-hands-two-boys.jpg"
        key="ogimage"
      />
    </Head>
  );
};

export default NextHead;