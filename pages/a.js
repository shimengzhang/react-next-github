import { withRouter } from 'next/router';

const A = (props) => {
  const { query, name, age } = props;
  return (<div>A {query.id} {name} {age}</div>);
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
