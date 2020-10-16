const mysql = require('mysql')
const MYSQL_CONFIG = require('./global_config')

//mysql
const pool = mysql.createPool(MYSQL_CONFIG.database)

//sql语句入口
const query = (sql, val) => {
  return new Promise((resolve,reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, val, (err, fields) => {
          if (err) reject({
            code: 201,
            message: err
          })
          else resolve({
            code: 200,
            message: '查询成功',
            response: fields
          })
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}