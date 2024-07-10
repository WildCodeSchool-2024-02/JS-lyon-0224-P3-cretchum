const AbstractRepository = require("./AbstractRepository");

class HomeStructureRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "home_structure" as configuration
    super({ table: "home_structure" });
  }

  // The C of CRUD - Create operation

  async create(structure) {
    // Execute the SQL INSERT query to add a new home_structure to the "home_structure" table
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

    // Return the ID of the newly inserted home_structure
    return result.insertId;
  }

  // The R of CRUD - Read operations

  // read all information except password on user and home_structure
  async readUserStructure(id) {
    // Execute the SQL SELECT query to retrieve a specific home_structure by its ID
    const [rows] = await this.database.query(
      `select user.id, lastname, firstname, username, phone_number, location, mail, avatar, description, postal_code, capacity, is_professional, cat, dog, price from ${this.table} RIGHT JOIN user ON ${this.table}.user_id = user.id WHERE user.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the home_structure
    if (rows[0] === undefined) {
      return null;
    }
    const phoneNumber = rows[0].phone_number;
    rows[0].phoneNumber = phoneNumber;
    delete rows[0].phone_number;
    const postalCode = rows[0].postal_code;
    rows[0].postalCode = postalCode;
    delete rows[0].postal_code;
    const isProfessional = rows[0].is_professional;
    rows[0].isProfessional = isProfessional;
    delete rows[0].is_professional;
    return rows[0];
  }

  // read only public home_structure and user information
  async readStructure(id) {
    // Execute the SQL SELECT query to retrieve a specific home_structure by its ID
    const [rows] = await this.database.query(
      `select username, location, avatar, description, postal_code, capacity, is_professional, cat, dog, price from ${this.table} RIGHT JOIN user ON ${this.table}.user_id = user.id WHERE ${this.table}.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the home_structure
    if (rows[0] === undefined) {
      return null;
    }
    return rows[0];
  }

  async checkHomeStructure(mail) {
    // Execute the SQL SELECT query to retrieve a specific home_structure by its ID
    const [rows] = await this.database.query(
      `select user_id from ${this.table} RIGHT JOIN user ON ${this.table}.user_id = user.id WHERE mail = ?`,
      [mail]
    );
    // Return the first row of the result, which represents the home_structure
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all homes strutures from the "home_structure" table
    const [rows] = await this.database.query(
      `select ${this.table}.id, lastname, firstname, username, phone_number, location, mail, description, postal_code, capacity, is_professional, cat, dog, price, user_id from ${this.table} JOIN user ON ${this.table}.user_id = user.id ORDER BY capacity DESC`
    );

    // Return the array of home_structure
    return rows;
  }

  // The U of CRUD - Update operation

  async update(structure) {
    // Execute the SQL UPDATE query to update a specific user
    const [userResult] = await this.database.query(
      `UPDATE user SET lastname = ?, firstname = ?, username = ?, phone_number = ?, location = ?, mail = ?, description = ? WHERE id = ?`,
      [
        structure.lastname,
        structure.firstname,
        structure.username,
        structure.phoneNumber,
        structure.location,
        structure.mail,
        structure.description,
        structure.id,
      ]
    );

    const [structureResult] = await this.database.query(
      `UPDATE ${this.table} SET postal_code = ?, capacity = ?, is_professional = ?, cat = ?, dog = ?, price = ? WHERE user_id = ?`,
      [
        structure.postalCode,
        structure.capacity,
        structure.isProfessional,
        structure.cat,
        structure.dog,
        structure.price,
        structure.id,
      ]
    );

    // Return how many rows were affected
    return {
      structureAffectedRows: structureResult.affectedRows,
      userAffectedRows: userResult.affectedRows,
    };
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a specific home_structure
    const [userId] = await this.database.query(
      `select ${this.table}.id from ${this.table} JOIN user ON ${this.table}.user_id = user.id where user.id = ?`,
      [id]
    );

    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [userId[0].id]
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
         u.username,  
         u.phone_number, 
         u.location, 
         u.avatar,
         hs.postal_code, 
         hs.is_professional, 
         hs.cat, 
         hs.dog, 
         hs.price 
       FROM ${this.table} hs 
       JOIN user u ON hs.user_id = u.id 
       WHERE u.location LIKE ? OR u.username LIKE ?
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
}

module.exports = HomeStructureRepository;
