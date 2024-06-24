const AbstractRepository = require("./AbstractRepository");

class HomeStructureRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "program" as configuration
    super({ table: "home_structure" });
  }

  // The C of CRUD - Create operation

  async create(structure) {
    // Execute the SQL INSERT query to add a new program to the "program" table
    const [result] = await this.database.query(
      `insert into ${this.table} (postal_code, capacity, is_professional, cat, dog, price, users_id) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        structure.postalCode,
        structure.capacity,
        structure.isProfessional,
        structure.cat,
        structure.dog,
        structure.price,
        structure.userId,
      ]
    );

    // Return the ID of the newly inserted program
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific program by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} JOIN users ON ${this.table}.users_id = users.id WHERE ${this.table}.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the program
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all programs from the "program" table
    const [rows] = await this.database.query(`select * from ${this.table} JOIN users ON ${this.table}.users_id = users.id ORDER BY capacity DESC`);

    // Return the array of programs
    return rows;
  }

  // The U of CRUD - Update operation

  async update(structure) {
    // Execute the SQL UPDATE query to update a specific program
    const [result] = await this.database.query(
      `update ${this.table} set postal_code = ?,capacity = ?,is_professional = ?cat = ?, dog = ?, price =?  where id = ?`,
      [
        structure.postal_code,
        structure.capacity,
        structure.is_professional,
        structure.cat,
        structure.dog,
        structure.price,
        structure.id,
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

  // includes for the searchBar
  async includes(search) {
    const [result] = await this.database.query(
      `SELECT ${this.table}.id, username, phone_number, location, postal_code, is_professional, cat, dog, price FROM ${this.table} JOIN users ON ${this.table}.users_id = users.id WHERE username like ? OR location like ?`,
      [`%${search}%`, `%${search}%`]
    );

    return result;
  }

  async login(homeStructure) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE mail = ? AND password = ?`,
      [homeStructure.mail, homeStructure.password]
    );
    return result;
  }
}

module.exports = HomeStructureRepository;
