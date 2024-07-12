const bcrypt = require("bcryptjs");
const tables = require("../../database/tables");

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Read user with valid, unexpired reset token
    const user = await tables.user.readByResetToken(token);

    if (user === undefined || user.resetPasswordExpires < Date.now()) {
      return res
        .status(400)
        .send("Password reset token is invalid or has expired.");
    }

    // Hachage password
    // Set the number of rounds to generate the salt used in the hash
    const saltRounds = 10;

    // Hide user password with bcrypt and number of saltRounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update password and delete token and expiry date
    await tables.user.updatePasswordAndClearResetToken(user.id, hashedPassword);

    // Delete password in clear
    delete req.body.password;

    return res.status(201).send("Password has been reset.");
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).send("An error occurred");
  }
};

module.exports = resetPassword;
