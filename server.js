const Koa = require('koa');
const Router = require('koa-router');
// 把 next 作为中间件使用
const next = require('next');
const session = require('koa-session');
const Redis = require('ioredis');
const RedisSessionStore = require('./server/session-store');
const config = require('./config');

// 是否处于dev状态，nextjs 开发时，肯定不需要 hot module replace 这些功能的
const dev = process.env.NODE_ENV !== 'production';
// 初始化 nextjs
const app = next({ dev });

// 需要开启数据库就解除这个注释
const redis = new Redis(config.redis);

// 用它来处理 http 请求的响应
const handle = app.getRequestHandler();

let index = 0;

// 等到 pages 下面的内容编译完成之后，才能响应
app.prepare().then(() => {
  // 创建 koa 实例
  const server = new Koa();
  const router = new Router();

  server.keys = ['Shimeng Develop Github App'];
  const SESSION_CONFIG = {
    key: 'jid',
    maxAge: 20 * 1000,
    store: new RedisSessionStore(redis),
  };

  server.use(session(SESSION_CONFIG, server));

  server.use(async (ctx, next) => {
    console.log(ctx.session);
    // ctx.session = ctx.session || {};
    // if (!ctx.session.user) {
    //   ctx.session.user = {
    //     name: 'joker',
    //     age: 18,
    //   };
    // } else {
    //   // console.log('session is ', ctx.session);
    // }
    await next();
  });

  router.get('/set/user', async (ctx) => {
    ctx.session.user = {
      name: 'joker',
      age: 18,
    };
    ctx.body = 'set session success';
  });

  router.get('/del/user', async (ctx) => {
    ctx.session = null;
    ctx.body = 'del session success';
  });

  router.get('/getsession', async (ctx) => {
    ctx.session = ctx.session || {};
    // if (ctx.session.user) {
    //   console.log('getsession is ', ctx.session);
    // }
    ctx.body = 'getsession';
    // await next();
  });

  router.get('/a/:id', async (ctx) => {
    const { id } = ctx.params;
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: {
        id,
      },
    });
    ctx.respond = false;
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', index, {
    //   httpOnly: false,
    // });
    index += 1;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log('koa server listening on 3000');
  });
});
