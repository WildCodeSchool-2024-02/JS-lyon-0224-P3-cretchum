const AbstractRepository = require("./AbstractRepository");

class AnimalRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "animal" as configuration
    super({ table: "animal" });
  }

  // The C of CRUD - Create operation

  async create(structure) {
    const allValues = structure.map((value) => [
      value.name,
      value.age,
      value.breed,
      value.specie,
      value.isSterilized,
      value.isTattooedChipped,
      value.userId,
    ]);

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, age, breed, species, is_sterilized, is_tattooed_chipped, user_id) VALUES ?`,
      [allValues]
    );

    // Return the ID of the newly inserted animal
    return result.insertId;
  }  

  async readAll() {
    // Execute the SQL SELECT query to retrieve all animals from the "animal" table
    const [rows] = await this.database.query(`select * from ${this.table} JOIN user ON ${this.table}.user_id = user.id`);

    // Return the array of animals
    return rows;
  }


  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific animal by its ID
    const [rows] = await this.database.query(
      `select ${this.table}.id, name, species, is_sterilized, is_tattooed_chipped, breed from ${this.table} JOIN user ON ${this.table}.user_id = user.id WHERE ${this.table}.user_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the animal
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a specific animal
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = AnimalRepository;
