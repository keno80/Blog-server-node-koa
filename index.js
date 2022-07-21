const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const cors = require('koa2-cors')
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}))

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.message.indexOf('Authentication') !== -1) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        message: 'token验证失败'
      }
    } else {
      console.log(err);
      ctx.body = {
        code: 201,
        message: err.message
      }
    }
  })
})

const routes = require('./router/index')

app.use(routes.routes(), routes.allowedMethods());

app.listen(9000)
console.log('app started at port 9000...')