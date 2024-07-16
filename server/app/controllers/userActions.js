// Import access to database tables
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const tables = require("../../database/tables");

const URL = `http://${process.env.DB_HOST}:${process.env.APP_PORT}/api`;

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all user from the database
    const user = await tables.user.readAll();

    // Respond with the user in JSON format
    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the user data from the request body and params
  const user = { ...req.body, id: req.params.id };
  try {
    // Update the user in the database
    await tables.user.update(user);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const user = req.body;
  try {
    // Hachage password
    // Set the number of rounds to generate the salt used in the hash
    const saltRounds = 10;

    // Hide user password with bcrypt and number of saltRounds
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Replace plaintext password with hashed password
    user.password = hashedPassword;

    // Insert the user into the database
    const insertId = await tables.user.create(user);

    delete req.body.password;

    const hasAnimals = false;
    const isHomeStructure = false;

    // Generate JWT token
    const token = jwt.sign(
      { sub: insertId, hasAnimals, isHomeStructure },
      process.env.APP_SECRET,
      { expiresIn: "1d" }
    );

    // Set the token in cookie
    res.cookie("cretchomCookie", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

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

    await tables.user.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.clearCookie("cretchomCookie");
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const checkLog = async (req, res, next) => {
  // Retrieve user email and password from HTTP request body
  const { mail, password } = req.body;
  try {
    // Retrieve user information from the database according to email address
    const user = await tables.user.login(mail);
    const homeStructure = await tables.home_structure.checkHomeStructure(mail);

    // Check that the user exists and that the password is correct
    if (
      user !== null &&
      user !== undefined &&
      (await bcrypt.compare(password, user.password)) === true
    ) {
      // Check if the user has any animals
      let hasAnimals = true;
      if (user.user_id === null) {
        hasAnimals = false;
      }
      let isHomeStructure = true;
      if (homeStructure.user_id === null) {
        isHomeStructure = false;
      }

      // Generate JWT token
      const token = jwt.sign(
        { sub: user.id, hasAnimals, isHomeStructure },
        process.env.APP_SECRET,
        { expiresIn: "1d" }
      );

      // Remove password from request body
      delete req.body.password;

      // Set the token in cookie
      res.cookie("cretchomCookie", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json();
    } else {
      res.status(401).json({ error: "unauthorized access" });
    }
  } catch (err) {
    next(err);
  }
};

// Edit profile picture

const editPicture = async (req, res, next) => {
  try {
    const userId = req.params.id;
    // Give the path which will be stored in the database
    const filePath = `${URL}/avatars/${req.file.filename}`;
    if (req.file !== null || req.file !== undefined) {
      await tables.user.editImagePath(userId, filePath);
      res.status(204).json(filePath);
    } else {
      res.status(400).json({
        validationErrors: [{ message: "Aucun fichier téléchargé." }],
      });
    }
  } catch (err) {
    next(err);
  }
};
const readPicture = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userAvatar = await tables.user.readAvatar(userId);

    if (userAvatar !== null) {
      res.status(200).json(userAvatar);
    } else {
      res.sendStatus(404).json({ error: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};
const disconect = async (req, res) => {
  res.clearCookie("cretchomCookie");
  res.status(200).json();
};
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  checkLog,
  disconect,
  editPicture,
  readPicture,
};
