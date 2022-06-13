const pool = require('../utils/pool');

class Owner {
  name;
  constructor(row) {
    this.name = row.name;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from owners');
    return rows.map((row) => new Owner(row));
  }
}
module.exports = { Owner };
