const AbstractSeeder = require("./AbstractSeeder");

class HomeStructureSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "home_structure", truncate: true });
  }

  run() {
    const homeStructure = [
      {
        postal_code: 69008,
        capacity: 25,
        is_professional: true,
        cat: true,
        dog: true,
        price: 25,
        users_id: 13,
      },
      {
        postal_code: 69100,
        capacity: 4,
        is_professional: false,
        cat: true,
        dog: false,
        price: 18,
        users_id: 14,
      },
      {
        postal_code: 69006,
        capacity: 3,
        is_professional: false,
        cat: false,
        dog: true,
        price: 18,
        users_id: 1,
      },
    ];

    homeStructure.forEach((structure) => {
      this.insert(structure);
    });
  }
}

module.exports = HomeStructureSeeder;
