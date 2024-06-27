const tables = require("../../database/tables");

const uniqueEmailandUsername = async (req, res, next) => {
  const { mail, username, id } = req.body;
  const uniqueEmail = await tables.user.finder("mail", mail, id);
  const uniqueUsername = await tables.user.finder("username", username, id);

  if (uniqueEmail > 0) {
    return res.status(409).json({
      validationErrors: [{ message: "Cette adresse mail est déjà utilisé" }],
    });
  }
  if (uniqueUsername > 0) {
    return res.status(409).json({
      validationErrors: [{ message: "Ce pseudo est déjà utilisé" }],
    });
  }
  return next();
};

module.exports = uniqueEmailandUsername;
