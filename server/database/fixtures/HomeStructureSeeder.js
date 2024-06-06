const AbstractSeeder = require("./AbstractSeeder");

class HomeStructureSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "home_structure", truncate: true });
  }

  run() {
    const homeStructure = [
      {
        name: "Yankee",
        city: "Lyon2",
        postal_code: 69002,
        mail: "yakeestructure@exemple.com",
        password: "true96783254",
        is_professional: true,
        cat: true,
        dog: true,
        price: 25,
      },
    ];

    homeStructure.forEach((structure) => {
      this.insert(structure);
    });
  }
}

module.exports = HomeStructureSeeder;
