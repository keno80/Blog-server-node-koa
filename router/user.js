const router = require('koa-router')()
const dataQuery = require('../utils/query')
const user_sql = require('../utils/user_sql')

//获取用户信息
router.get('/getInfo', async (ctx, next) => {
  let query = ctx.request.query
  // const data = await findUser(query.name)
  const data = await dataQuery.query(user_sql.userSQL.QUERY_TABLE('user'))

  console.log(`新请求 -> /userInfo, 请求参数 -> ${query.name}`);
  console.log(data);

  ctx.response.body = data
})

module.exports = router