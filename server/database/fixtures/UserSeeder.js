const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "users", truncate: true });
  }

  run() {
    const users = [
      {
        lastname: "Moustache",
        firstname: "Pedro",
        username: "judekornichon",
        phone_number: 788264465,
        location: "Perrache",
        mail: "darkpedro@exemple.com",
        password: "true!25445aa",
        description: "Non !",
      },
    ];

    users.forEach((user) => {
      this.insert(user);
    });
  }
}

module.exports = UserSeeder;
