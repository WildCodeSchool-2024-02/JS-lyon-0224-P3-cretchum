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
      `SELECT reservation.id, animal.name, username, DATE_FORMAT(reservation_date_beginning, "%d/%m/%Y") AS beginning, DATE_FORMAT(reservation_date_end, "%d/%m/%Y") AS end,  reservation.status FROM ${this.table} JOIN animal on animal_id = animal.id JOIN user ON user_id=user.id     WHERE animal.user_id= ?;
      `,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows;
  }
}
module.exports = HomeStructureRepository;
