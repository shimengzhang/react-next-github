const withCss = require('@zeit/next-css');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => ({});
}

module.exports = withCss({});

// 假设有 withLess
// module.exports = withLess(withCss({}));
