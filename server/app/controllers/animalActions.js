const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    // Fetch a specific animal from the database based on the provided ID
    const animal = await tables.animal.read(req.params.id);

    // If the animal is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the users in JSON format
    if (animal === null || animal === undefined) {
      res.sendStatus(404);
    } else {
      res.status(200).json(animal);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readAnimalId = async (req, res, next) => {
  try {
    // Fetch a specific animal from the database based on the provided ID
    const animal = await tables.animal.readId(req.params.id);
    // If the animal is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the users in JSON format
    if (animal === null || animal === undefined) {
      res.sendStatus(404);
    } else {
      res.status(200).json(animal);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the animal data from the request body
  const animal = req.body;

  try {
    // Insert the animal into the database
    const insertId = await tables.animal.create(animal);

    const { sub, isHomeStructure } = req.user;
    let { hasAnimals } = req.user;

    hasAnimals = true;

    // Generate JWT token
    const token = jwt.sign(
      { sub, hasAnimals, isHomeStructure },
      process.env.APP_SECRET,
      { expiresIn: "1d" }
    );

    // Set the token in cookie
    res.cookie("cretchomCookie", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Respond with HTTP 201 (Created) and the ID of the newly inserted animal
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the user from the database
    await tables.animal.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  read,
  add,
  destroy,
  readAnimalId,
};
