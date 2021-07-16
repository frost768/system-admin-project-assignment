const mysql = require('mysql');
const fs = require('fs');
const TABLE = process.env.DB_TABLE;

let config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: fs.readFileSync('/run/secrets/db-password', 'utf8'),
    database: process.env.DB_NAME,
    port: 3306
};

const _db = mysql.createConnection(config);
_db.connect(err=> {
  if(err) reconnect(_db)
  console.log('Connected to database');
});

function reconnect(connection){
  if(connection) connection.destroy();
  var connection = mysql.createConnection(config);

  connection.connect((err) => {
      if(err) setTimeout(reconnect, 2000);
      else {
          return connection;
      }
  });
}

function create(ip_addr) {
  let record = { ip_addr, timestamp: new Date() }
  return new Promise((resolve,reject)=> {
    _db.query(`INSERT INTO ${TABLE} SET ?`, record, function (err, res) {
      if (err) {
          reconnect(_db);
        }
        resolve({ isSuccess: true, id: res.insertId });
    }) 
  })
}

function list() {
  let query = `SELECT * FROM ${TABLE} ORDER BY timestamp DESC`;
  return new Promise((resolve, reject) => {
    _db.query(query, function (err, rows, fields) {
      if (err) {
        reconnect(_db);
      }
      resolve(rows);
    });

  })
}
function groupedByIp() {
  let query = `SELECT COUNT(*) AS amount, ip_addr AS ip FROM ${TABLE} GROUP BY ip_addr`;
  return new Promise((resolve, reject) => {
    _db.query(query, function (err, rows, fields) {
      console.log('promise', query);
      if (err) {
        reconnect(_db);
      }
      resolve(rows);
    });

  })
}



module.exports = {
  create,
  list,
  groupedByIp
}
