const Joi = require("joi");
const tables = require("../../database/tables");

const signInSchema = Joi.object({
  lastname: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(2)
    .max(55)
    .required()
    .messages({
      "string.pattern.base":
        "Le champ 'Nom' doit contenir uniquement des lettres.",
    }),
  firstname: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(2)
    .max(55)
    .required()
    .messages({
      "string.pattern.base":
        "Le champ 'Prénom' doit contenir uniquement des lettres.",
    }),
  username: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .min(10)
    .max(10)
    .required()
    .messages({
      "string.pattern.base":
        "Le champ 'Téléphone' doit etre au format 0612345678.",
    }),
  location: Joi.string().min(3).max(55).required(),
  mail: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
  description: Joi.string().min(0).max(800),
});

const validateSignup = (req, res, next) => {
  const { error } = signInSchema.validate(req.body, { abortEarly: true });

  if (!error === true) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

const uniqueEmailandUsername = async (req, res, next) => {
  const { mail, username } = req.body;
  const uniqueEmail = await tables.user.finder("mail", mail);
  const uniqueUsername = await tables.user.finder("username", username);

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

module.exports = { validateSignup, uniqueEmailandUsername };
