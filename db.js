
const odbc = require('odbc');

module.exports = class {
  pool;
  static async connect(connString) {
    this.pool = await odbc.connect(connString);
  }

  static query(query, params) {
    return this.pool.query(query, params);
  }
}