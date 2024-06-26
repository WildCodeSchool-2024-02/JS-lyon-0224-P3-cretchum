const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const UserSeeder = require("./UserSeeder");

class HomeStructureSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "home_structure", truncate: true, dependencies: [UserSeeder] });
  }

  run() {
    const homeStructure = [
      {
        postal_code : 69008,
        capacity : 25,
        is_professional: true,
        cat: true,
        dog: true,
        price: 25,
        user_id : 1,
      },
      {
        postal_code : 69100,
        capacity : 4,
        is_professional: false,
        cat: true,
        dog: false,
        price: 18,
        user_id : 2,
      },
      {
        postal_code: 69006,
        capacity : 3,
        is_professional: false,
        cat: false,
        dog: true,
        price: 18,
        user_id : 3,
      },
    ];

    homeStructure.forEach((structure) => {
      this.insert(structure);
    });
  }
}

module.exports = HomeStructureSeeder;
