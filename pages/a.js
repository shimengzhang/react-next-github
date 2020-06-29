import { withRouter } from 'next/router';
import styled from 'styled-components';

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;

const A = (props) => {
  const { query, name, age } = props;
  return (<Title>A {query.id} {name} {age}</Title>);
};

A.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        query,
        name: 'jock lili',
      });
    }, 1000);
  });
  const ret = await promise;
  return ret;
  // return ({ query, name: 'jocky' });
};

export default withRouter(A);
