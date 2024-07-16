const AbstractRepository = require("./AbstractRepository");

class AnimalRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "animal" as configuration
    super({ table: "animal" });
  }

  // The C of CRUD - Create operation

  async create(structure) {
    const allValues = structure.map((value) => [
      value.name,
      value.age,
      value.breed,
      value.specie,
      value.isSterilized,
      value.isTattooedChipped,
      value.userId,
    ]);

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, age, breed, species, is_sterilized, is_tattooed_chipped, user_id) VALUES ?`,
      [allValues]
    );

    // Return the ID of the newly inserted animal
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific animal by its ID
    const [rows] = await this.database.query(
      `select ${this.table}.id, name, species, is_sterilized, is_tattooed_chipped, breed from ${this.table} LEFT JOIN user ON ${this.table}.user_id = user.id WHERE user.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the animal
    return rows;
  }

  async readId(id) {
    const [rows] = await this.database.query(
      `select species, is_sterilized, is_tattooed_chipped, breed from ${this.table} WHERE id = ? ;`,
      [id]
    );

    return rows[0];
  }
  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL DELETE query to delete a specific animal
    const [notification] = await this.database.query(
      `delete notification from notification JOIN reservation ON notification.reservation_id = reservation.id JOIN animal ON reservation.animal_id = animal.id WHERE animal.id = ?`,
      [id]
    );

    const [reservation] = await this.database.query(
      `delete reservation from reservation JOIN animal ON reservation.animal_id = animal.id WHERE animal.id = ?`,
      [id]
    );

    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return [
      result.affectedRows,
      reservation.affectedRows,
      notification.affectedRows,
    ];
  }
}

module.exports = AnimalRepository;
