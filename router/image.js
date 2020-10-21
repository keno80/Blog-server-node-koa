const multer = require('@koa/multer')
const path = require('path')
const fs = require('fs')
const router = require('koa-router')()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function (req, file, cb) {
    const fileFormat = file.originalname.split('.')[1]
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${fileFormat}`)
  }
})

const upload = multer({storage: storage})

router.post('/upload', upload.single('file'), async (ctx, next) => {
  const body = ctx.file
  const fileUrl = `${ctx.origin}/image/get/${body.filename}`
  console.log(ctx.origin);

  console.log(body);

  ctx.response.body = {
    code: 200,
    data: {
      fileUrl
    }
  }
})

router.get('/get/:filename', async (ctx, next) => {
  const filePath = path.join(__dirname, `../public/images/${ctx.request.params.filename}`)

  ctx.response.body = fs.readFileSync(filePath)
})

module.exports = router