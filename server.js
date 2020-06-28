const Koa = require('koa');
const Router = require('koa-router');
// 把 next 作为中间件使用
const next = require('next');

// 是否处于dev状态，nextjs 开发时，肯定不需要 hot module replace 这些功能的
const dev = process.env.NODE_ENV !== 'production';
// 初始化 nextjs
const app = next({ dev });

// 用它来处理 http 请求的响应
const handle = app.getRequestHandler();

// 等到 pages 下面的内容编译完成之后，才能响应
app.prepare().then(() => {
  // 创建 koa 实例
  const server = new Koa();
  const router = new Router();

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
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log('koa server listening on 3000');
  });
});
