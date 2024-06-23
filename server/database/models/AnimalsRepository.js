const AbstractRepository = require("./AbstractRepository");

class AnimalRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "program" as configuration
    super({ table: "animals" });
  }

  // The C of CRUD - Create operation

  async create(structure) {
    // Execute the SQL INSERT query to add a new program to the "program" table

    const allValues = structure.map((value) => [
      value.name,
      value.age,
      value.breed,
      value.species,
      value.isSterilized,
      value.userId,
    ]);

    const [result] = await this.database.query(
      `insert into ${this.table} (name, age, breed, species, is_sterilized, user_id) values ?`,
      [allValues]
    );

    // Return the ID of the newly inserted program
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific program by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} JOIN users ON ${this.table}.users_id = users.id where users.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the program
    return rows[0];
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a specific program
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = AnimalRepository;
