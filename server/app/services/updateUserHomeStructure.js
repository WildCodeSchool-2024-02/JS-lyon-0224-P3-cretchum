const Joi = require("joi");

const userHomeStructureSchema = Joi.object({
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
  mail: Joi.string().email().required().messages({
    "string.email": "Merci de respecter le bon format de mail",
  }),
  description: Joi.string().min(0).max(800),
  avatar: Joi.string().min(0).max(254),
  isProfessional: Joi.number().required(),
  postalCode: Joi.string().min(5).max(5).required().messages({
    "string.pattern.base": "Le code postal doit correspondre au format 69000",
  }),
  capacity: Joi.number().min(1).required(),
  price: Joi.number().required(),
  cat: Joi.number().required(),
  dog: Joi.number().required(),
  id: Joi.number().required(),
});

const updateUserHomeStructure = (req, res, next) => {
  const { error } = userHomeStructureSchema.validate(req.body, {
    abortEarly: true,
  });

  if (error === undefined) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = updateUserHomeStructure;
