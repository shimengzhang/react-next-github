const Koa = require('koa');
const Router = require('koa-router');

// 创建 koa 实例
const server = new Koa();
// 创建 router 实例
const router = new Router();
// 处理 /test 路由
router.get('/test', (ctx) => {
  const { path, method } = ctx;
  // ctx.body = `<p>request ${path} ${method} </p>`;
  // 返回 json 格式
  ctx.body = { success: true };
  ctx.set('Content-Type', 'application/json');
});
// 处理 /test1 路由，并获取参数
router.get('/test1/:id', (ctx) => {
  const { path, params } = ctx;
  ctx.body = `<p>request ${path} ${params.id}</p>`;
});
// 将 router 应用在 koa 实例上
server.use(router.routes());

server.use(async (ctx, next) => {
  await next();
});

server.listen(3000, () => {
  console.log('koa server listening on 3000');
});
