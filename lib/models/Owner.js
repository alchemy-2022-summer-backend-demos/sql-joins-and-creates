const pool = require('../utils/pool');

class Owner {
  id;
  name;
  pets;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.pets = row.pets ?? [];
  }

  static async insert({ name }) {
    const { rows } = await pool.query(
      'INSERT INTO owners (name) VALUES ($1) RETURNING *',
      [name]
    );
    return new Owner(rows[0]);
  }

  async addPetById(id) {
    await pool.query(
      'INSERT INTO owners_pets (owner_id, pet_id) VALUES ($1, $2) RETURNING *',
      [this.id, id]
    );
    return this;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from owners');
    return rows.map((row) => new Owner(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      owners.*, 
      COALESCE(
        json_agg(to_jsonb(pets))
        FILTER (WHERE pets.id IS NOT NULL), '[]'
    ) as pets from owners 
      LEFT JOIN owners_pets on owners.id = owners_pets.owner_id 
      LEFT JOIN pets on owners_pets.pet_id = pets.id
      WHERE owners.id = $1
      GROUP BY owners.id`,
      [id]
    );
    return new Owner(rows[0]);
  }
}
module.exports = { Owner };
