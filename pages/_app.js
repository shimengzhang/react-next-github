import App from 'next/app';
import 'antd/dist/antd.css';
import Layout from '../components/Layout.jsx';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} age = {39} />
    </Layout>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   console.log('appProps', appProps);
//   return { ...appProps };
// };

export default MyApp;
