const dayjs = require('dayjs')

function nowTime() {
  return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

//分页查询文章
const QUERY_PAGE_ARTICLE = (page, size) => `SELECT * FROM article ORDER BY isTop DESC limit ${page - 1},${size};`

//条件查询
const QUERY_CONDITION_PAGE_ARTICLE = (article, page, size) => `SELECT * FROM article WHERE title LIKE '%${article.title}%' OR type='${article.type}' limit ${page - 1},${size};`

//获取某一篇文章详情
const QUERY_ARTICLE_INFO = (id) => `SELECT * FROM article WHERE article_id='${id}';UPDATE article SET view_people=view_people+1 WHERE article_id=${id}`

//插入数据
const INSERT_ARTICLE = (article) => `INSERT INTO article SET title='${article.title}',tags='${article.tags}',content='${article.content}',create_time='${nowTime()}',description='${article.description}',code_theme='${article.codeTheme}',preview_theme='${article.previewTheme}',isTop=${article.isTop};`

//整体数据
const UPDATE_ARTICLE = (article) => `UPDATE article SET title='${article.title}',type='${article.type}',tags='${article.tags}',content='${article.content}',description='${article.description}',isTop=${article.isTop} WHERE article_id='${article.article_id}';`

//置顶
const UPDATE_ISTOP = (key, val, primaryKey, primaryVal) => `UPDATE article SET ${key}=${val} WHERE ${primaryKey}=${primaryVal};`

//删除数据
const DELETE_ARTICLE = (val) => `DELETE FROM article WHERE article_id='${val}'`

const articleSQL = {
  QUERY_PAGE_ARTICLE,
  QUERY_CONDITION_PAGE_ARTICLE,
  QUERY_ARTICLE_INFO,
  INSERT_ARTICLE,
  UPDATE_ARTICLE,
  UPDATE_ISTOP,
  DELETE_ARTICLE
}

module.exports = {
  articleSQL
}