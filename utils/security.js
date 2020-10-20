const jwt = require('jsonwebtoken')
const secret = 'node-koa-jwt'
const koa_jwt = require('koa-jwt')

const signToken = (userInfo) => {
  const userToken = {
    username: userInfo[0].username,
    uid: userInfo[0].uid
  }
  return jwt.sign(userToken, secret)
}

const verifyToken = (token) => {
  return jwt.verify(token, secret)
}

const need_token = koa_jwt({secret})

module.exports = {
  secret,
  signToken,
  verifyToken,
  need_token
}
