const {User} = require('./DataBase')

//用户查询
async function findUser(params) {
  let res = {}
  await User.findOne({username: params}, (err, doc) => {
    if (!err) {
      if (doc !== null) {
        res = {
          code: 200,
          data: {
            uid: doc.uid,
            username: doc.username,
            email: doc.email,
            phone: doc.phone
          },
          message: 'success'
        }
      } else {
        res = {
          code: 201,
          data: `未找到用户 ${params}`,
          message: 'error'
        }
      }
    } else {
      console.log(err);
      res = {err}
    }
  })
  return res
}

//新增用户
async function insertUser(obj) {
  let res = {}
  console.log(obj);

  let user = new User(obj)
  user.save().then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })

  return res = 'success'
}

module.exports = {
  findUser,
  insertUser
}