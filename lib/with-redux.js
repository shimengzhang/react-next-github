import React from 'react';
import createStore from '../store/store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default (Comp) => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      const { Component, pageProps, ...rest } = this.props;
      if (pageProps) {
        pageProps.test = 124;
      }
      return <Comp
        Component={Component}
        pageProps={pageProps}
        {...rest}
        reduxStore={this.reduxStore}
      />;
    }
  }
  // function TestHocComp({ Component, pageProps, ...rest }) {
  //   console.log(Component, pageProps);
  //   if (pageProps) {
  //     pageProps.test = 124;
  //   }

  //   return <Comp Component={Component} pageProps={pageProps} {...rest}/>;
  // }
  // TestHocComp.getInitialProps = Comp.getInitialProps;
  WithReduxApp.getInitialProps = async (ctx) => {
    const reduxStore = getOrCreateStore();
    ctx.reduxStore = reduxStore;

    let appProps = {};
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  };
  return WithReduxApp;
};

// export default (Comp) => function TestHocComp(props) {
//   return <Comp {...props}/>;
// };

// export default (Comp) => function TestHocComp({name, ...rest}) {
//   const name = name + '-c'
//   return <Comp {...props} name={name}/>;
// };
