const AbstractRepository = require("./AbstractRepository");

class HomeStructureRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "program" as configuration
    super({ table: "reservation" });
  }

  async create(reservation) {
    const allValues = reservation.map((value) => [
      value.reservation_date_beginning,
      value.reservation_date_end,
      value.home_structure_id,
      value.animal_id,
    ]);
    // Execute the SQL INSERT query to add a new user to the "useer" table
    const [result] = await this.database.query(
      `insert into ${this.table} (reservation_date_beginning, reservation_date_end, home_structure_id, animal_id) values ?`,
      [allValues]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select ${this.table}.id, reservation_date_beginning, reservation_date_end from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }
}
module.exports = HomeStructureRepository;
