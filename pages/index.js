import { Button } from 'antd';
import LINK from 'next/link';
import Router from 'next/router';

const events = [
  'routeChangeStart', // 改变路由就是前三个钩子
  'routeChangeComplete',
  'beforeHistoryChange',
  'routeChangeError', // 路由发送错误
  'hashChangeStart', // 如果只改变 hash,就是后两个钩子
  'hashChangeComplete',
];

const makeEvent = (type) => (...args) => { console.log(type, ...args); };

events.forEach((event) => {
  Router.events.on(event, makeEvent(event));
});

export default () => (
  <div>

    <Button onClick={() => { Router.push('/test/b'); }}>to test/b</Button>
    <Button onClick={() => {
      Router.push({
        pathname: '/test/b',
        query: {
          id: 2,
        },
      }, '/test/b/2');
    }}>to test/b</Button>
  </div>
);
