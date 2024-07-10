const AbstractRepository = require("./AbstractRepository");

class NotificationRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "notification" as configuration
    super({ table: "notification" });
  }

  async create(reservation, reservationId, type) {
    let [userId] = [];
    const { username } = reservation[0];

    // Create notification for username to home_structure direction;
    if ((type === "cancel" && username === undefined) || type === undefined) {
      [userId] = await this.database.query(
        ` SELECT user.id  FROM user JOIN home_structure ON home_structure.user_id = user.id WHERE home_structure.id = ? ;`,
        [reservation[0].home_structure_id]
      );
    } else {
      // Create notification for home_structure to username direction;
      [userId] = await this.database.query(
        "SELECT user.id FROM user WHERE username = ?",
        [username]
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
