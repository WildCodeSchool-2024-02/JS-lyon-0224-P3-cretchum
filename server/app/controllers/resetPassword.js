const bcrypt = require("bcryptjs");
const tables = require("../../database/tables");

const resetPassword = async (req, res) => {
  const user = await tables.user.read({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (user !== undefined) {
    return res
      .status(400)
      .send("Password reset token is invalid or has expired.");
  }

  const { password } = req.body;
  user.password = bcrypt.hashSync(password, 8);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return res.status(200).send("Password has been reset.");
};

module.exports = resetPassword;
