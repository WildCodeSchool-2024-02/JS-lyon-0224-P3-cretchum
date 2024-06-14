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
        phone_number: "0788264465",
        location: "Perrache",
        mail: "darkpedro@exemple.com",
        password: "true!25445aa",
        description: "Non !",
      },
      {
        lastname: "Martin",
        firstname: "Lou",
        username: "Lou69",
        phone_number: "0688263395",
        location: "Lyon 7",
        mail: "lou.martin@exemple.com",
        password: "password",
        description: "J'ai 2 chiens :) !",
      },
    ];

    users.forEach((user) => {
      this.insert(user);
    });
  }
}

module.exports = UserSeeder;
