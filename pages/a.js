import { withRouter } from 'next/router';
import styled from 'styled-components';
// import moment from 'moment';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';

const Comp = dynamic(import('../components/comp'));

const Title = styled.div`
  color: #ccc;
  font-size: 16px;
`;

const A = (props) => {
  // console.log('customKey', process.env.customKey);
  // Only holds serverRuntimeConfig and publicRuntimeConfig
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  // Will only be available on the server-side
  // console.log(serverRuntimeConfig.mySecret);
  // Will be available on both server-side and client-side
  // console.log(publicRuntimeConfig.staticFolder);
  const {
    query, name, age, time,
  } = props;
  return (
    <div>
      <Title>A {query.id} {name} {age} {time}</Title>
      <Comp></Comp>
    </div>
  );
};

A.getInitialProps = async ({ ctx }) => {
  const { req, query } = ctx;
  const moment = await import('moment');

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        query,
        name: 'jock lili',
        time: moment.default(Date.now() - 60 * 1000).fromNow(),
      });
    }, 1000);
  });
  const ret = await promise;
  return ret;
};

export default withRouter(A);
