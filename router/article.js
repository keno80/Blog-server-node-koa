const router = require('koa-router')()
const dayjs = require('dayjs')
const dataQuery = require('../utils/query')
const article_sql = require('../utils/article_sql')

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

  for (let i = 0; i < data.response.length; i++) {
    data.response[i].tags = eval(data.response[i].tags)
    data.response[i].create_time = dayjs(data.response[i].create_time).format('YYYY-MM-DD hh:mm:ss')
  }

  ctx.response.body = data
})

//添加新文章
router.post('/add', async (ctx, next) => {
  let reqBody = ctx.request.body

  let data = await dataQuery.query(article_sql.articleSQL.INSERT_ARTICLE(reqBody))

  data.response = undefined
  ctx.response.body = data
})

//编辑文章
router.post('/edit', async (ctx, next) => {
  let reqBody = ctx.request.body

  let data = await dataQuery.query(article_sql.articleSQL.UPDATE_ARTICLE(reqBody))

  data.response = undefined
  ctx.response.body = data
})

//删除文章
router.delete('/delete/:article_id', async (ctx, next) => {
  let req = ctx.params

  let data = await dataQuery.query(article_sql.articleSQL.DELETE_ARTICLE(req.article_id))

  data.response = undefined
  ctx.response.body = data
})

//文章置顶设置
router.put('/top/:article_id', async (ctx, next) => {
  const req = ctx.params
  const body = ctx.request.body
  let data = {}

  if (body.isTop === 1) {
    data = await dataQuery.query(article_sql.articleSQL.UPDATE_ISTOP('isTop', 0, 'article_id', req.article_id))
  } else {
    data = await dataQuery.query(article_sql.articleSQL.UPDATE_ISTOP('isTop', 1, 'article_id', req.article_id))
  }

  data.response = undefined
  ctx.response.body = data
})

module.exports = router