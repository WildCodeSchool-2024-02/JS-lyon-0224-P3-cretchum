const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const read = async (req, res, next) => {
  const token = req.cookies.cretchomCookie;

  try {
    if (token === undefined) {
      res.status(401).json({ error: "Invalid token" });
    } else {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const userId = decoded.sub;
      const reservations = await tables.reservation.read(userId);
      res.status(200).json(reservations);
    }
  } catch (err) {
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
// Reads reservations received as a home structure
const received = async (req, res, next) => {
  const token = req.cookies.cretchomCookie;
  try {
    if (token === undefined) {
      res.status(401).json({ error: "Invalid token" });
    } else {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const userId = decoded.sub;
      const reservations = await tables.reservation.readReceived(userId);
      res.status(200).json(reservations);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  add,
  received,
};
