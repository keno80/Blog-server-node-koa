const router = require('koa-router')()
const {findUser, insertUser} = require('../utils/UserOptions')

//获取用户信息
router.get('/getInfo', async (ctx, next) => {
  let query = ctx.request.query
  const data = await findUser(query.name)

  console.log(`新请求 -> /userInfo, 请求参数 -> ${query.name}`);
  console.log(data);

  ctx.response.body = data
})

//新增用户
router.post('/addUser', async (ctx, next) => {
  let body = ctx.request.body
  console.log(`新请求 -> /addUser`);

  const data = await insertUser(body)
  console.log(data);

  ctx.response.body = data
})

module.exports = router