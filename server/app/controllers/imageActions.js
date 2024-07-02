// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
// const browse = async (req, res, next) => {
//   try {
//     // Fetch all user from the database
//     const user = await tables.user.readAll();

//     // Respond with the user in JSON format
//     res.status(200).json(user);
//   } catch (err) {
//     // Pass any errors to the error-handling middleware
//     next(err);
//   }
// };

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

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

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        validationErrors: [{ message: "Aucun fichier téléchargé." }],
      });
    }

    // const userId = req.params.id;
    const filePath = req.file.path;

    // Enregistrer le chemin du fichier dans la base de données ici
    // Par exemple: db.query('UPDATE users SET profile_image = ? WHERE id = ?', [filePath, userId]);

    // console.log(req.file, req.body);

    res.status(204).json({
      message: "Image téléchargée avec succès",
      filePath,
    });
    return "a";
  } catch (err) {
    next(err);
    // console.error(err);
    return res
      .status(500)
      .json({ validationErrors: [{ message: "Erreur du serveur." }] });
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the user from the database

    await tables.user.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// const checkLog = async (req, res, next) => {
//   // Retrieve user email and password from HTTP request body
//   const { mail, password } = req.body;
//   try {
//     // Retrieve user information from the database according to email address
//     const user = await tables.user.login(mail);

//     // Check that the user exists and that the password is correct
//     if (
//       user !== null &&
//       user !== undefined &&
//       (await bcrypt.compare(password, user.password)) === true
//     ) {
//       // Check if the user has any animals
//       let hasAnimals = true;
//       if (user.user_id === null) {
//         hasAnimals = false;
//       }

//       // Generate JWT token
//       const token = jwt.sign(
//         { sub: user.id, hasAnimals },
//         process.env.APP_SECRET,
//         { expiresIn: "1d" }
//       );

//       // Remove password from request body
//       delete req.body.password;

//       // Set the token in cookie
//       res.cookie("cookie", token, {
//         httpOnly: true,
//         sameSite: "Strict",
//         maxAge: 24 * 60 * 60 * 1000,
//       });
//       res.status(200).json();
//     } else {
//       res.status(401).json({ error: "accès non autorisé" });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// const disconect = async (req, res) => {
//   res.clearCookie("cookie");
//   res.status(200).json();
// };
// Ready to export the controller functions
module.exports = {
  read,
  edit,
  destroy,
};
