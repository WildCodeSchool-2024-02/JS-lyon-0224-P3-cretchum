const AbstractRepository = require("./AbstractRepository");

class AnimalRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "program" as configuration
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
      `INSERT INTO ${this.table} (name, age, breed, species, is_sterilized, is_tattooed_chipped, users_id) VALUES ?`,
      [allValues]
    );

    // Return the ID of the newly inserted program
    return result.insertId;
  }  

  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await this.database.query(`select * from ${this.table} JOIN users ON ${this.table}.users_id = users.id`);

    // Return the array of programs
    return rows;
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
