const router = require('koa-router')()
const { signToken, need_token } = require('../utils/security')
const dataQuery = require('../utils/query')
const user_sql = require('../utils/user_sql')

//用户登录
router.post('/login', async (ctx, next) => {
  let body = ctx.request.body

  const userInfo = await dataQuery.query(user_sql.userSQL.USER_LOGIN(body))

  if (userInfo.length !== 0) {
    if (userInfo[0].password === body.password) {
      const token = signToken(userInfo)
      ctx.response.body = {
        code: 200,
        message: '登录成功',
        data: {
          token
        },
      }
    } else {
      ctx.response.body = {
        code: 201,
        message: '登录失败，密码错误',
      }
    }
  }
})

//获取用户信息
router.post('/getInfo', need_token, async (ctx, next) => {
  const { username } = ctx.state.user

  const res = await dataQuery.query(user_sql.userSQL.USER_INFO(username))

  res[0].password = undefined

  ctx.response.body = {
    code: 200,
    message: '获取个人信息成功',
    data: res[0]
  }
})

module.exports = router
