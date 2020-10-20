const router = require('koa-router')()
const {signToken} = require('../utils/security')
const dataQuery = require('../utils/query')
const user_sql = require('../utils/user_sql')

//用户登录
router.post('/login', async (ctx, next) => {
  let body = ctx.request.body

  const userInfo = await dataQuery.query(user_sql.userSQL.USER_LOGIN(body.username))

  if (userInfo.length !== 0) {
    if (userInfo[0].password === body.password) {
      const token = signToken(userInfo)
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
})

//获取用户信息
router.get('/getInfo', async (ctx, next) => {

  const data = await dataQuery.query(user_sql.userSQL.QUERY_TABLE('user'))

  data[0].password = undefined

  ctx.response.body = {
    code: 200,
    message: '获取个人信息成功',
    data
  }
})

module.exports = router