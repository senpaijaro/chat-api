require('dotenv').config();
const DB_CONNECTION = process.env.DB_CONNECTION || 'mysql'
const HOST = process.env.MYSQL_HOST || 'lss'
const PORT = parseInt(process.env.MYSQL_PORT) || 3306
const USER = process.env.MYSQL_USER || 'root'
const PASS = process.env.MYSQL_PASS || ''
const DBNAME = process.env.MYSQL_DBNAME || ''

module.exports = {
  development: {
    username: USER,
    password: PASS,
    database: DBNAME,
    host: HOST,
    port: PORT,
    dialect: DB_CONNECTION
  }
}

