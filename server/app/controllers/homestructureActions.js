const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  const { search } = req.query;
  const { limit } = req.query;
  const { offset } = req.query;
  try {
    const homeStructure = await tables.home_structure.research(
      search,
      limit,
      offset
    );
    res.status(200).json(homeStructure);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const readall = async (req, res, next) => {
  try {
    // Fetch a specific home_structure from the database based on the provided ID
    const homeStructure = await tables.home_structure.readUserStructure(req.params.id);

    // If the home_structure is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the home_structure in JSON format
    if (homeStructure == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(homeStructure);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific home_structure from the database based on the provided ID
    const homeStructure = await tables.home_structure.readStructure(req.params.id);

    // If the home_structure is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the home_structure in JSON format
    if (homeStructure == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(homeStructure);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the home_structure data from the request body and params
  const homeStructure = { ...req.body, id: req.params.id };

  try {
    // Update the home_structure in the database
    await tables.home_structure.update(homeStructure);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the home_structure data from the request body
  const homeStructure = req.body;
  try {
    // Insert the home_structure into the database
    const insertId = await tables.home_structure.create(homeStructure);

    const { sub, hasAnimals } = req.user;
    let { isHomeStructure } = req.user;

    isHomeStructure = true;

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

    // Respond with HTTP 201 (Created) and the ID of the newly inserted home_structure
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the home_structure from the database

    await tables.home_structure.delete(req.body.id);

    const { sub, hasAnimals } = req.user;
    let { isHomeStructure } = req.user;

    isHomeStructure = false;

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

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  readall,
  read,
  edit,
  add,
  destroy,
};
