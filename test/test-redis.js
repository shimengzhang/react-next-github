const Redis = require('ioredis');

const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  password: '123456',
});
(async function test() {
  await redis.set('abc', { a: 1, b: 2 });
  await redis.setex('sessionid', 10, '232341234');
  const keys = await redis.keys('*');
  const arr = await redis.get('arr');

  console.log(keys);
  console.log(arr);
  console.log('sessionid', await redis.get('sessionid'));
  setTimeout(async () => {
    const curSessionid = await redis.get('sessionid');
    console.log('sessionid', curSessionid);
  }, 5000);
}());
