import App from 'next/app';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import Layout from '../components/Layout.jsx';
import store from '../store/store';
import withRedux from '../lib/with-redux';

function MyApp({ Component, pageProps, reduxStore }) {
  console.log('hehehe');
  return (
    <Layout>
      <Provider store={reduxStore}>
        <Component {...pageProps} age = {39} />
      </Provider>
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { Component } = appContext;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(appContext);
  }
  return { pageProps };
};

export default withRedux(MyApp);
