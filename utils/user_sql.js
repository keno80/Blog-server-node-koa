//创建数据库
  const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS user(
    uid INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    phone INT(11) NOT NOLL,
    PASSWORD VARCHAR(255) NOT NULL,
    PRIMARY KEY (uid)
  );`.replace(/[\r\n]/g, '')

//查询数据库
const USER_INFO = (username) => `SELECT * FROM user WHERE username='${username}';`

const USER_LOGIN = (data) => `SELECT * FROM user WHERE username='${data.username}' AND password='${data.password}';`

const userSQL = {
  CREATE_TABLE,
  USER_INFO,
  USER_LOGIN
}

module.exports = {
  userSQL
}