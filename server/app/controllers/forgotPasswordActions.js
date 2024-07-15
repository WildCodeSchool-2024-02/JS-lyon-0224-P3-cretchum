const nodemailer = require("nodemailer");
const crypto = require("crypto");
const tables = require("../../database/tables");

const { CLIENT_URL, MAIL_FROM, MAILTRAP_PASSWORD, MAILTRAP_USER } = process.env;

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body; // Get the email from the request body
    const user = await tables.user.readByEmail(email); // Check if user exists with the given email

    if (user === undefined) {
      return res.status(400).send("User with this email does not exist.");
    }

    const token = crypto.randomBytes(20).toString("hex"); // Generate a random token
    const expires = new Date(Date.now() + 3600000); // Set expiration time for the token (1 hour)

    await tables.user.updateResetToken(user.id, token, expires);

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: MAIL_FROM,
      to: user.mail,
      subject: "Réinitialisation du mot de passe",
      text: `Vous recevez cet email car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
      Veuillez cliquer sur le lien suivant, ou le copier dans votre navigateur pour compléter le processus :\n\n
      ${CLIENT_URL}/reinitialiser-mot-de-passe/${token}\n\n
      Si vous n'avez pas fait cette demande,, veuillez ignorer cet email et votre mot de passe restera inchangé.\n`,
    };

    const info = await transporter.sendMail(mailOptions);
    if (info) {
      return res.status(250).json("Recovery email sent");
    }
    console.error("There was an error sending the email");
    return res.status(500).send("Error sending email");
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).send("An error occurred");
  }
};



module.exports = forgotPassword;
