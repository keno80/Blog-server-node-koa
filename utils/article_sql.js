const dayjs = require('dayjs')

function nowTime() {
  return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

//分页查询文章
const QUERY_PAGE_ARTICLE = (page, size) => `SELECT * FROM article ORDER BY isTop DESC limit ${page - 1},${size};`

//条件查询
const QUERY_CONDITION_PAGE_ARTICLE = (article, page, size) => `SELECT * FROM article WHERE title LIKE '%${article.title}%' OR type='${article.type}' limit ${page - 1},${size};`

//插入数据
const INSERT_ARTICLE = (article) => `INSERT INTO article SET title='${article.title}',type='${article.type}',tags='${article.tags}',content='${article.content}',create_time='${nowTime()}',description='${article.description}',introduce='${article.introduce}',isTop=${article.isTop};`

//整体数据
const UPDATE_ARTICLE = (article) => `UPDATE article SET title='${article.title}',type='${article.type}',tags='${article.tags}',content='${article.content}',description='${article.description}',introduce='${article.introduce}',isTop=${article.isTop} WHERE article_id='${article.article_id}';`

//置顶
const UPDATE_ISTOP = (key, val, primaryKey, primaryVal) => `UPDATE article SET ${key}=${val} WHERE ${primaryKey}=${primaryVal};`

//删除数据
const DELETE_ARTICLE = (val) => `DELETE FROM article WHERE article_id='${val}'`

const articleSQL = {
  QUERY_PAGE_ARTICLE,
  QUERY_CONDITION_PAGE_ARTICLE,
  INSERT_ARTICLE,
  UPDATE_ARTICLE,
  UPDATE_ISTOP,
  DELETE_ARTICLE
}

module.exports = {
  articleSQL
}