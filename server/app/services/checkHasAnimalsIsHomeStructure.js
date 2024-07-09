const tables = require("../../database/tables");

const checkHasAnimalsIsHomeStructure = async (req, res, next) => {
  try {
    req.hasAnimals = true;
    req.isHomeStructure = true;

    const animal = await tables.animal.read(req.params.id);
    const homeStructure = await tables.home_structure.checkHomeStructure(req.params.id);

    if (animal.length === 0 || animal[0].user_id === null || animal[0].user_id === undefined) {
      req.hasAnimals = false;
    }
    if (homeStructure.length === 0 || homeStructure[0].user_id === null || homeStructure[0].user_id === undefined) {
      req.isHomeStructure = false;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkHasAnimalsIsHomeStructure;
