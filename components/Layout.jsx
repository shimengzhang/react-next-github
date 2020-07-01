import React, { Fragment } from 'react';
import { Button } from 'antd';
import LINK from 'next/link';

export default ({ children }) => (
  <Fragment>
    <header>
      <LINK href="/a?id=1" as="/a/1">
        <Button>to A</Button>
      </LINK>
      <LINK href="#aaa">
        <Button>hash</Button>
      </LINK>
    </header>
    {children}
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: #fff;
          font-size: 24px;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: #fefefe;
        }
      `}</style>
    </div>
  </Fragment>
);
