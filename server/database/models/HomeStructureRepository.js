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
      `insert into ${this.table} (postal_code, capacity, is_professional, cat, dog, price, user_id) values (?, ?, ?, ?, ?, ?, ?)`,
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
      `select * from ${this.table} JOIN user ON ${this.table}.user_id = user.id WHERE ${this.table}.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the program
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all homes strutures from the "home_structure" table
    const [rows] = await this.database.query(
      `select * from ${this.table} JOIN user ON ${this.table}.user_id = user.id ORDER BY capacity DESC`
    );

    // Return the array of programs
    return rows;
  }

  // The U of CRUD - Update operation

  async update(structure) {
    // Execute the SQL UPDATE query to update a specific program
    const [result] = await this.database.query(
      `update ${this.table} set postal_code = ?,capacity = ?,is_professional = ?, cat = ?, dog = ?, price =?  where id = ?`,
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

  // research for the searchBar limits the number of results and returns the results from the offset
  async research(search, limit, offset) {
    const parsedLimit = parseInt(limit, 10);
    const parsedOffset = parseInt(offset, 10);

    const [result] = await this.database.query(
      `SELECT 
         hs.id, 
         u.firstname AS name, 
         u.phone_number, 
         u.location, 
         hs.postal_code, 
         hs.is_professional, 
         hs.cat, 
         hs.dog, 
         hs.price 
       FROM ${this.table} hs 
       JOIN user u ON hs.user_id = u.id 
       WHERE u.firstname LIKE ? OR u.location LIKE ? 
       LIMIT ? OFFSET ? `,
      [`%${search}%`, `%${search}%`, parsedLimit, parsedOffset]
    );

    // count number of total rows
    const [count] = await this.database.query(
      `SELECT COUNT(hs.id) AS total 
       FROM ${this.table} hs 
       JOIN user u ON hs.user_id = u.id 
       WHERE u.firstname LIKE ? OR u.location LIKE ?`,
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
