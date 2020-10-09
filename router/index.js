const router = require('koa-router')()

const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(__dirname)

files.filter(file => file.endsWith('.js')).forEach(item => {
  const item_name = item.substr(0, item.length - 3)
  const item_entity = require(path.join(__dirname, item))
  if (item_name !== 'index') {
    router.use(`/${item_name}`, item_entity.routes(), item_entity.allowedMethods())
  }
})

module.exports = router