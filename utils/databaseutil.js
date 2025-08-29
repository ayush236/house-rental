const mysql = require('mysql2');

const pool =mysql.createPool({
    host:'localhost',
    user:'root',
    database:'homes',
    password:'root@123'
});

module.exports = pool.promise();