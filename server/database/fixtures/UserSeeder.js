const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
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
        mail: "lou1.martin@exemple.com",
        password: "password",
        description: "J'ai 2 chiens :) !",
      },
      {
        lastname: "Pedro",
        firstname: "pascal",
        username: "Pedro",
        phone_number: "0688263395",
        location: "Lyon 7",
        mail: "lou2.martin@exemple.com",
        password: "password",
        description: "J'ai 2 chiens :) !",
      },
      {
        lastname: "Mike",
        firstname: "Mike",
        username: "Au Bonheur du chien",
        phone_number: "0688263395",
        location: "Lyon 7",
        mail: "lou3.martin@exemple.com",
        password: "password",
      },
    ];

    users.forEach((user) => {
      this.insert(user);
    });
  }
}

module.exports = UserSeeder;
