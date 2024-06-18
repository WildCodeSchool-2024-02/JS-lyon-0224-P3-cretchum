const AbstractSeeder = require("./AbstractSeeder");

class HomeStructureSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "home_structure", truncate: true });
  }

  run() {
    for (let i = 0; i < 1000; i += 1) {
      // Generate fake user data
      const fakeHomeStructure = {
        name: this.faker.internet.userName(),
        lastname: this.faker.person.lastName(),
        firstname: this.faker.person.firstName(),
        phone_number: this.faker.string.numeric(10),
        location: this.faker.location.city(),
        postal_code: this.faker.number.bigInt({ min: 69000, max: 69999 }),
        mail: this.faker.internet.email(), // Generate a fake email using faker library
        password: this.faker.internet.password(), // Generate a fake password using faker library
        capacity: this.faker.number.int({ min: 0, max: 30 }),
        is_professional: this.faker.datatype.boolean({ probability: 0.5 }),
        cat: this.faker.datatype.boolean({ probability: 0.3 }),
        dog: this.faker.datatype.boolean({ probability: 0.6 }),
        price: this.faker.number.bigInt({ min: 10, max: 100 }),
      };
      // Insert the fakeUser data into the 'user' table
      this.insert(fakeHomeStructure); // insert into user(email, password) values (?, ?)
    }
  }
}

module.exports = HomeStructureSeeder;
