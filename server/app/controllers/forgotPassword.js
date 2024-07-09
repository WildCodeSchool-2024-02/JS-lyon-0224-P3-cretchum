const nodemailer = require("nodemailer");
const crypto = require("crypto");
const tables = require("../../database/tables");

const { GMAIL, GMAIL_USER_PASSWORD } = process.env;

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body; // Get the email from the request body
    const user = await tables.user.readByEmail({ email }); // Check if user exists with the given email

    if (user === undefined) {
      return res.status(400).send("User with this email does not exist.");
    }

    const token = crypto.randomBytes(20).toString("hex"); // Generate a random token
    user.resetPasswordToken = token; // Assign the token to the user
    user.resetPasswordExpires = Date.now() + 3600000; // Set expiration time for the token (1 hour)
    await user.save(); // Save the user with the new token and expiration time

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: GMAIL,
        pass: GMAIL_USER_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: GMAIL,
      subject: "Réinitialisation du mot de passe",
      text: `Vous recevez cet email car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
        Veuillez cliquer sur le lien suivant, ou le copier dans votre navigateur pour compléter le processus :\n\n
        http://${req.headers.host}/reset/${token}\n\n
        Si vous n'avez pas demandé cela, veuillez ignorer cet email et votre mot de passe restera inchangé.\n`,
    };

    const info = await transporter.sendMail(mailOptions);
    if (info !== undefined) {
      console.error("There was an error sending the email");
      return res.status(500).send("Error sending email");
    }
    return res.status(200).json("Recovery email sent");
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).send("An error occurred");
  }
};

module.exports = forgotPassword;
