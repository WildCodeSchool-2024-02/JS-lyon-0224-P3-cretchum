const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.reservation.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const reservations = req.body;
  try {
    // Insert the user into the database
    const insertId = await tables.reservation.create(reservations);
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  read,
  add,
};
