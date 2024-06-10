const AbstractSeeder = require("./AbstractSeeder");

class HomeStructureSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "home_structure", truncate: true });
  }

  run() {
    const homeStructure = [
      {
        name: "Yankee",
        lastname : "jean",
        firstname : "Michel" ,
        phone_number :  788264465,
        location : "123 trois ptits chats",
        postal_code: 69002,
        mail: "yakeestructure@exemple.com",
        password: "true96783254",
        is_professional: true,
        cat: true,
        dog: true,
        price: 25,
      },
      {
        name: "Ludovic",
        lastname : "Gépa",
        firstname : "Didier" ,
        phone_number :  788264465,
        location : "31 adresse d'exemple",
        postal_code: 69100,
        mail: "bonjour@exemple.com",
        password: "false96783254",
        is_professional: false,
        cat: true,
        dog: false,
        price: 18,
      },
    ];

    homeStructure.forEach((structure) => {
      this.insert(structure);
    });
  }
}

module.exports = HomeStructureSeeder;
