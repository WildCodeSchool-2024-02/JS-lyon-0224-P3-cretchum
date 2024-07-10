const AbstractRepository = require("./AbstractRepository");

class NotificationRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "animal" as configuration
    super({ table: "notification" });
  }

  async create(reservation, reservationId, type) {
    // console.log(reservation[0].home_structure_id);
    let [userId] = [];
    if (type === undefined) {
      [userId] = await this.database.query(
        ` SELECT user.id  FROM user JOIN home_structure ON home_structure.user_id = user.id WHERE home_structure.id = ? ;`,
        [reservation[0].home_structure_id]
      );
    }
    const allValues = reservation.map(() => [reservationId, userId[0].id]);

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} ( reservation_id, user_id) values ? ;`,
      [allValues]
    );
    return result.affectedRows;
  }
}

module.exports = NotificationRepository;
