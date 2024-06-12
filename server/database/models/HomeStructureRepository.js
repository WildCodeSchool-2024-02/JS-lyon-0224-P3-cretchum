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
      `insert into ${this.table} (name, city, postal_code, mail, password , is_professional, cat, dog, price) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        structure.name,
        structure.city,
        structure.postal_code,
        structure.mail,
        structure.password,
        structure.is_professional,
        structure.cat,
        structure.dog,
        structure.price,
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

  async update(structure) {
    // Execute the SQL UPDATE query to update a specific program
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, city = ?, postal_code = ?, mail = ?, password = ?, is_professional = ?, cat = ?, dog = ?, price =?,  where id = ?`,
      [
        structure.name,
        structure.city,
        structure.postal_code,
        structure.mail,
        structure.password,
        structure.is_professional,
        structure.cat,
        structure.dog,
        structure.price,
        structure.id
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

  async filter(filters) {
    let sql = `SELECT * FROM ${this.table} WHERE 1=1`;

    if (filters.nom) {
      sql += ` AND name LIKE '%${filters.nom}%'`;
    }
    if (filters.codePostal) {
      sql += ` AND postal_code = '${filters.codePostal}'`;
    }
    if (filters.type && filters.type !== 'tous') {
      sql += ` AND type = '${filters.type}'`;
    }
    if (filters.structure && filters.structure !== 'tous') {
      sql += ` AND structure = '${filters.structure}'`;
    }
    if (filters.prix && filters.prix !== 'tous') {
      switch (filters.prix) {
        case 'fourchette1':
          sql += ` AND price BETWEEN 10 AND 20`;
          break;
        case 'fourchette2':
          sql += ` AND price BETWEEN 20 AND 30`;
          break;
        default:
          break;
      }
    }

    const [rows] = await this.database.query(sql);
    return rows;
  }
}

module.exports = HomeStructureRepository;
