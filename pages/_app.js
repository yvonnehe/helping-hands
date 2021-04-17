import Layout from "../components/layout/Layout";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
