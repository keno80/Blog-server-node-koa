const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const dataQuery = require('../utils/query')
const user_sql = require('../utils/user_sql')

//用户登录
router.post('/login', async (ctx, next) => {
  let body = ctx.request.body

  const userInfo = await dataQuery.query(user_sql.userSQL.USER_LOGIN(body.username))

  if (userInfo.response.length !== 0) {
    if (userInfo.response[0].password === body.password) {
      const userToken = {
        username: userInfo.response[0].username,
        uid: userInfo.response[0].uid
      }
      const secret = 'node-koa-jwt'
      const token = jwt.sign(userToken, secret)
      ctx.response.body = {
        code: 200,
        message: '登录成功',
        token
      }
    } else {
      ctx.response.body = {
        code: 201,
        message: '登录失败，密码错误'
      }
    }
  }
  //
  // console.log(`新请求 -> /userInfo, 请求参数 -> ${query.name}`);
  // console.log(data);
  //
  // ctx.response.body = data
})

//获取用户信息
router.get('/getInfo', async (ctx, next) => {

  let data = await dataQuery.query(user_sql.userSQL.QUERY_TABLE('user'))

  data.response[0].password = undefined

  ctx.response.body = data
})

module.exports = router