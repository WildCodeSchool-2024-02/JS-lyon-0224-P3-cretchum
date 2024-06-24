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
      `insert into ${this.table} (is_professional, name, lastname, firstname, phone_number, postal_code, location, mail, capacity, price, cat, dog, password, description) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        structure.isProfessional,
        structure.name,
        structure.lastname,
        structure.firstname,
        structure.phoneNumber,
        structure.postalCode,
        structure.location,
        structure.mail,
        structure.capacity,
        structure.price,
        structure.cat,
        structure.dog,
        structure.password,
        structure.description,
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
    const [rows] = await this.database.query(
      `select * from ${this.table} ORDER BY capacity DESC`
    );

    // Return the array of programs
    return rows;
  }

  // The U of CRUD - Update operation

  async update(structure) {
    // Execute the SQL UPDATE query to update a specific program
    const [result] = await this.database.query(
      `update ${this.table} set is_professionnal = ?, name = ?, lastname = ?, firstname = ?, phone_number = ?, postal_code = ?, location = ?, mail = ?, capacity = ?, price = ?, cat = ?, dog = ?, password = ?, description = ?, where id = ?`,
      [
        structure.is_professional,
        structure.name,
        structure.lastname,
        structure.firstname,
        structure.phone_number,
        structure.postal_code,
        structure.location,
        structure.mail,
        structure.capacity,
        structure.price,
        structure.cat,
        structure.dog,
        structure.password,
        structure.description,
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

  // research for the searchBar limits the number of results and returns the results from the offset
  async research(search, limit, offset) {
    const [result] = await this.database.query(
      `SELECT id, name, phone_number, location, postal_code, is_professional, cat, dog, price FROM ${this.table} WHERE name like ? OR location like ? LIMIT ${limit} OFFSET ${offset}`,
      [`%${search}%`, `%${search}%`]
    );
    // count number of total rows
    const [count] = await this.database.query(
      `SELECT COUNT(id) AS total FROM ${this.table} WHERE name like ? OR location like ? `,
      [`%${search}%`, `%${search}%`]
    );
    const totalRow = count[0];
    return { result, totalRow };
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
