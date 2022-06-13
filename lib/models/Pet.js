class Pet {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async insert() {}
  static async getAll() {}
  static async getById(id) {}
  static async addOwnerById(id) {}
}
module.exports = Pet;
