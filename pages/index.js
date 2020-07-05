import { Button } from 'antd';
import LINK from 'next/link';
import Router from 'next/router';
import Head from 'next/head';
import { connect } from 'react-redux';

// import store from '../store/store';

// const events = [
//   'routeChangeStart', // 改变路由就是前三个钩子
//   'routeChangeComplete',
//   'beforeHistoryChange',
//   'routeChangeError', // 路由发送错误
//   'hashChangeStart', // 如果只改变 hash,就是后两个钩子
//   'hashChangeComplete',
// ];

// const makeEvent = (type) => (...args) => { console.log(type, ...args); };

// events.forEach((event) => {
//   Router.events.on(event, makeEvent(event));
// });

const Index = (props) => (
  <div>
    <div>{props.count} {props.name}</div>
    <Button onClick={() => { Router.push('/test/b'); }}>to test/b</Button>
    <Button onClick={() => {
      Router.push({
        pathname: '/test/b',
        query: {
          id: 2,
        },
      }, '/test/b/2');
    }}>to test/b</Button>
    <Button onClick={props.handleCount}>增加 count</Button>
  </div>
);
Index.getInitialProps = async ({ reduxStore }) => {
  console.log('reduxStore');
  await reduxStore.dispatch(addAsync());
  // reduxStore.dispatch(ADD);
  return {};
};

function addAsync(num) {
  return async (dispatch) => {
    console.log('addAsync');
    await (new Promise((resolve) => {
      setTimeout(() => {
        console.log('ADD');
        dispatch(ADD);
        resolve();
      }, 1000);
    }));
  };
}

const ADD = {
  type: 'ADD',
};

const mapStateToProps = (state) => ({
  count: state.count.count,
  name: state.user.name,
});

const mapDispatchToProps = (dispatch) => ({
  handleCount() {
    dispatch(addAsync());
    // dispatch(ADD);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
