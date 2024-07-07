const Joi = require("joi");

// Declares the different fields of the user table

const lastname = Joi.string()
  .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
  .min(2)
  .max(55)
  .required()
  .messages({
    "string.pattern.base":
      "Le champ 'Nom' doit contenir uniquement des lettres.",
  });
const firstname = Joi.string()
  .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
  .min(2)
  .max(55)
  .required()
  .messages({
    "string.pattern.base":
      "Le champ 'Prénom' doit contenir uniquement des lettres.",
  });

const username = Joi.string().min(3).max(20).required();
const phoneNumber = Joi.string()
  .pattern(/^[0-9]{10}$/)
  .min(10)
  .max(10)
  .required()
  .messages({
    "string.pattern.base":
      "Le champ 'Téléphone' doit etre au format 0612345678.",
  });
const location = Joi.string().min(3).max(55).required();
const mail = Joi.string().email().required();
const password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:;ù#àâäéèêëîïôöùûüÿç])[A-Za-z\d@$!%*?&:;ù#àâäéèêëîïôöùûüÿç]{12,}$/).min(12).required();
const description = Joi.string().min(0).max(800);

// Schema of SingUp form

const signInSchema = Joi.object({
  lastname,
  firstname,
  username,
  phoneNumber,
  location,
  mail,
  password,
  description,
});

// Validation of SingUp form :

const validateSignup = (req, res, next) => {
  const { error } = signInSchema.validate(req.body, { abortEarly: true });

  if (!error === true) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

// Schema of edit profile :
const profileSchema = Joi.object({
  id: Joi.number().required(),
  lastname,
  firstname,
  username,
  phoneNumber,
  location,
  mail,
  description,
});

const validateProfileEdit = (req, res, next) => {
  const { error } = profileSchema.validate(req.body, { abortEarly: true });
  if (!error === true) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = { validateSignup, validateProfileEdit };
