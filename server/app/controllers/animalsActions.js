const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const animal = await tables.animals.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the users in JSON format
    if (animal == null) {
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
  // Extract the user data from the request body
  const animal = req.body;
  try {
    // Insert the user into the database
    const insertId = await tables.animals.create(animal);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
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

    await tables.animals.delete(req.params.id);

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
};
