const router = require('koa-router')()
const dayjs = require('dayjs')
const dataQuery = require('../utils/query')
const article_sql = require('../utils/article_sql')
const {need_token} = require('../utils/security')

//获取文章列表 以及 条件查询
router.post('/list/:page/:size', async (ctx, next) => {
  let pagination = ctx.params
  let reqBody = ctx.request.body
  let data = {}

  if (reqBody.title === '' && reqBody.type === '') {
    data = await dataQuery.query(article_sql.articleSQL.QUERY_PAGE_ARTICLE(pagination.page, pagination.size))
  } else {
    data = await dataQuery.query(article_sql.articleSQL.QUERY_CONDITION_PAGE_ARTICLE(reqBody, pagination.page, pagination.size))
  }

  for (let i = 0; i < data.length; i++) {
    data[i].tags = eval(data[i].tags)
    data[i].create_time = dayjs(data[i].create_time).format('YYYY-MM-DD hh:mm:ss')
  }

  ctx.response.body = {
    code: 200,
    message: '文章获取成功',
    data
  }
})

//添加新文章
router.post('/add', need_token, async (ctx, next) => {
  let reqBody = ctx.request.body

  await dataQuery.query(article_sql.articleSQL.INSERT_ARTICLE(reqBody)).then(() => {
    ctx.response.body = {
      code: 200,
      message: '新增文章成功'
    }
  })
})

//编辑文章
router.post('/edit', need_token, async (ctx, next) => {
  let reqBody = ctx.request.body

  await dataQuery.query(article_sql.articleSQL.UPDATE_ARTICLE(reqBody)).then(() => {
    ctx.response.body = {
      code: 200,
      message: '文章编辑成功'
    }
  })
})

//删除文章
router.delete('/delete/:article_id', need_token, async (ctx, next) => {
  let req = ctx.params

  await dataQuery.query(article_sql.articleSQL.DELETE_ARTICLE(req.article_id)).then(() => {
    ctx.response.body = {
      code: 200,
      message: '文章删除成功'
    }
  })
})

//文章置顶设置
router.put('/top/:article_id', need_token, async (ctx, next) => {
  const req = ctx.params
  const body = ctx.request.body

  if (body.isTop === 1) {
    await dataQuery.query(article_sql.articleSQL.UPDATE_ISTOP('isTop', 0, 'article_id', req.article_id)).then(() => {
      ctx.response.body = {
        code: 200,
        message: '文章置顶状态修改成功'
      }
    })
  } else {
    await dataQuery.query(article_sql.articleSQL.UPDATE_ISTOP('isTop', 1, 'article_id', req.article_id)).then(() => {
      ctx.response.body = {
        code: 200,
        message: '文章置顶状态修改成功'
      }
    })
  }
})

module.exports = router