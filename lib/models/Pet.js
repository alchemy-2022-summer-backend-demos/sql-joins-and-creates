const pool = require('../utils/pool');

class Pet {
  id;
  name;
  type;
  owners;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.owners = row.owners ?? [];
  }

  static async insert({ name, type, age }) {
    const { rows } = await pool.query(
      'INSERT INTO pets (name, type, age) VALUES ($1, $2, $3) RETURNING *',
      [name, type, age]
    );
    return new Pet(rows[0]);
  }
  async addOwnerById(ownerId) {
    await pool.query(
      'INSERT INTO owners_pets (owner_id, pet_id) VALUES ($1, $2) RETURNING *',
      [ownerId, this.id]
    );
    return this;
  }

  static async getAll() {}
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      pets.*, 
      COALESCE(
        json_agg(to_jsonb(owners))
        FILTER (WHERE owners.id IS NOT NULL), '[]'
    ) as owners from pets 
      LEFT JOIN owners_pets on pets.id = owners_pets.pet_id 
      LEFT JOIN owners on owners_pets.owner_id = owners.id
      WHERE pets.id = $1
      GROUP BY pets.id`,
      [id]
    );
    return new Pet(rows[0]);
  }
}
module.exports = Pet;
