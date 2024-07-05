const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "useer" table
    const [result] = await this.database.query(
      `insert into ${this.table} (lastname, firstname, username, phone_number, location, mail, password, description) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.lastname,
        user.firstname,
        user.username,
        user.phoneNumber,
        user.location,
        user.mail,
        user.password,
        user.description,
      ]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select ${this.table}.id, lastname, firstname, username, phone_number, location, mail, description from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    const phoneNumber = rows[0].phone_number;
    rows[0].phoneNumber = phoneNumber;
    delete rows[0].phone_number;
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all user from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of user
    return rows;
  }

  // The U of CRUD - Update operation

  async update(user) {
    // Execute the SQL UPDATE query to update a specific user
    const [result] = await this.database.query(
      `update ${this.table} set lastname = ?, firstname = ?, username = ?, phone_number = ?, location = ?, mail = ?, description = ?  where id = ?`,
      [
        user.lastname,
        user.firstname,
        user.username,
        user.phoneNumber,
        user.location,
        user.mail,
        user.description,
        user.id,
      ]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a specific user
    const [homeStructure] = await this.database.query(
      "delete from home_structure where user_id = ?",
      [id]
    );

    const [anim] = await this.database.query(
      `delete from animal where user_id = ?`,
      [id]
    );

    const [user] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return [user.affectedRows, anim.affectedRows, homeStructure.affectedRows];
  }

  async login(mail) {
    const [result] = await this.database.query(
      `SELECT ${this.table}.id, ${this.table}.password, ${this.table}.mail, animal.user_id FROM ${this.table} LEFT JOIN animal ON animal.user_id = user.id WHERE mail = ?`,
      [mail]
    );

    // Return the first row of the result, which represents the user
    return result[0];
  }

  // For check if an email address or username is already in use
  async finder(column, element, id) {
    if (id === undefined) {
      const [result] = await this.database.query(
        // column can be only mail or username, it is defined in the middleware validateSignUp
        `SELECT COUNT(id) AS count FROM user WHERE ${column} = ?`,
        [element]
      );
      return result[0].count;
    }
    const parsedId = parseInt(id, 10);
    const [result] = await this.database.query(
      // column can be only mail or username, it is defined in the middleware validateSignUp
      `SELECT COUNT(id) AS count FROM user WHERE ${column} = ? AND NOT id = ?`,
      [element, parsedId]
    );
    return result[0].count;
  }
}

module.exports = UserRepository;
