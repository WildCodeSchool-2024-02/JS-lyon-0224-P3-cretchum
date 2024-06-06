const AbstractRepository = require("./AbstractRepository");

class ProgramRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "program" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new program to the "program" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)`,
      [
        user.lastname,
        user.firstname,
        user.username,
        user.phone_number,
        user.location,
        user.mail,
        user.password,
        user.description,
      ]
    );

    // Return the ID of the newly inserted program
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific program by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the program
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of programs
    return rows;
  }

  // The U of CRUD - Update operation

  async update(user) {
    // Execute the SQL UPDATE query to update a specific program
    const [result] = await this.database.query(
      `update ${this.table} set lastname = ?, firstname = ?, username = ?, phone_number = ?, location = ?, mail = ?, password = ?, description = ?  where id = ?`,
      [
        user.lastname,
        user.firstname,
        user.username,
        user.phone_number,
        user.location,
        user.mail,
        user.password,
        user.description,
      ]
    );

    // Return how many rows were affected
    return result.affectedRows;
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

module.exports = ProgramRepository;
