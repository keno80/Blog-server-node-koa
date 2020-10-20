const mysql = require('mysql')
const MYSQL_CONFIG = require('./global_config')

//mysql
const pool = mysql.createPool(MYSQL_CONFIG.database)

//sql语句入口
const query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, val, (err, fields) => {
          if (err) reject(err)
          else resolve(fields)
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}