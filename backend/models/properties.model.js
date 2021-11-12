// TODO: Refacor config out
const fs = require('fs');
const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOSTNAME,
  database: process.env.DBNAME,
  password: process.env.PASSWORD,
  port: process.env.DBPORT || 25060,
  ssl: {
    ca: fs.readFileSync('./ca-certificate.cer').toString(),
  }
});

const getProperties = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM properties ORDER BY id ASC', (error, results) => {
      if (error || !results.rows) {
        reject(error || !results.rows);
      }
      resolve(results.rows);
    })
  })
}

module.exports = {
  getProperties,
}