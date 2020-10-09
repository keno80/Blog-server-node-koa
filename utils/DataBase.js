const mongoose = require('mongoose')

// let admin = 'mongodb://root:Kai123..@110.43.44.58/admin'
let blog = 'mongodb://root:Kai123..@110.43.44.58/blog?authSource=admin'
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// let adminDB = mongoose.createConnection(admin, options)
// adminDB.on('connected', function () {
//   console.log('验证成功');
// })

let blogDB = mongoose.createConnection(blog, options)
blogDB.on('connected', function () {
  console.log('连接成功');
})

let UserSchema = new mongoose.Schema({
  uid: Number,
  username: String,
  password: String,
  email: String,
  phone: Number
})

let User = blogDB.model('User', UserSchema)

module.exports = {
  mongoose,
  User
}