const withCss = require('@zeit/next-css');
// const config = require('./config')

const configs = {
  // 编译文件的输出目录
  distDir: 'dist',
  // 是否给每个路由生成Etag，有了 nginx 的 Etag 配置，就可以关掉这个
  generateEtags: true,
  // 页面内容缓存配置，只是用在开发时
  onDemandEntries: {
    // 内容在内存中缓存的时长（ms）
    maxInactiveAge: 25 * 1000,
    // 同时缓存多少个页面
    pagesBufferLength: 2,
  },
  // 在pages目录下那种后缀的文件会被认为是页面
  pageExtensions: ['jsx', 'js'],
  // 配置buildId（只有要对同一个项目做多个节点的部署时，才会用到）
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID;
    }

    // 返回null 使用默认的unique id
    return null;
  },
  // 手动修改webpack 默认 config，next 的编译、热启动、热更替这些都是通过 webpack 来实现的
  webpack(config, options) {
    return config;
  },
  // 修改webpackDevMiddleware配置
  webpackDevMiddleware: (config) => config,
  // 可以在页面上通过 process.env.customKey 获取 value
  env: {
    customKey: 'value',
  },
  // 下面两个要通过 'next/config' 来读取
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET,
  },
  // 在服务端渲染和客户端渲染都可获取的配置
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
};

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {};
}

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const SCOPE = 'user';

// module.exports = withCss({
//   publicRuntimeConfig: {
//     GITHUB_OAUTH_URL,
//     OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${
//       config.github.client_id
//     }&scope=${SCOPE}`,
//   },
// })

module.exports = withCss({
  // distDir: 'dest',
  env: {
    customKey: 'value',
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
});
