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
      value.priceday,
    ]);
    // Execute the SQL INSERT query to add a new user to the "useer" table
    const [result] = await this.database.query(
      `insert into ${this.table} (reservation_date_beginning, reservation_date_end, home_structure_id, animal_id, priceday) values ?`,
      [allValues]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT reservation.id, animal.name, username, DATE_FORMAT(reservation_date_beginning, "%d/%m/%Y") AS beginning, DATE_FORMAT(reservation_date_end, "%d/%m/%Y") AS end, DATEDIFF( reservation_date_end, reservation_date_beginning ) AS day, priceday, reservation.status FROM ${this.table} JOIN animal on animal_id = animal.id JOIN home_structure ON home_structure.id=home_structure_id JOIN user ON home_structure.user_id=user.id    WHERE animal.user_id= ? ORDER BY reservation.id DESC;
      `,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows;
  }

  // Reads reservations received as a home structure
  async readReceived(userId) {
    const [rows] = await this.database.query(
      `SELECT reservation.id, animal.name, username, DATE_FORMAT(reservation_date_beginning, "%d/%m/%Y") AS beginning, DATE_FORMAT(reservation_date_end, "%d/%m/%Y") AS end, DATEDIFF( reservation_date_end, reservation_date_beginning ) AS day, priceday, reservation.status FROM ${this.table} JOIN animal on animal_id = animal.id JOIN user ON user_id=user.id JOIN home_structure ON home_structure_id=home_structure.id  WHERE home_structure.user_id= ? ORDER BY reservation.id DESC;
    `,
      [userId]
    );

    return rows;
  }

  async verifyCancel(userId, reservationId) {
    const [response] = await this.database.query(
      `SELECT COUNT( reservation.id) AS verify  FROM reservation  JOIN animal on animal_id = animal.id JOIN user ON animal.user_id=user.id JOIN home_structure ON home_structure_id=home_structure.id  WHERE (user.id= ? and reservation.id= ? ) OR (home_structure.user_id= ? AND reservation.id= ? );
      `,
      [userId, reservationId, userId, reservationId]
    );
    return response[0].verify;
  }

  async edit(reservationId, type) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} set status= ? where reservation.id= ?;
      `,
      [type, reservationId]
    );
    return result.affectedRows;
  }
}
module.exports = HomeStructureRepository;
