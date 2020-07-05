export default (Comp) => {
  function TestHocComp({ Component, pageProps, ...rest }) {
    console.log(Component, pageProps);
    if (pageProps) {
      pageProps.test = 124;
    }

    return <Comp Component={Component} pageProps={pageProps} {...rest}/>;
  }
  TestHocComp.getInitialProps = Comp.getInitialProps;
  return TestHocComp;
};

// export default (Comp) => function TestHocComp(props) {
//   return <Comp {...props}/>;
// };

// export default (Comp) => function TestHocComp({name, ...rest}) {
//   const name = name + '-c'
//   return <Comp {...props} name={name}/>;
// };
