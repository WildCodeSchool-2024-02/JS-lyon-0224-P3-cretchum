const Joi = require("joi");

const animalSchema = Joi.object({
  name: Joi.string().min(2).max(55).required(),
  age: Joi.number().required(),
  breed: Joi.string()
  .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
  .min(2)
  .max(55)
  .required()
  .messages({
    "string.pattern.base":
      "Le champ 'Race' doit contenir uniquement des lettres."}),
  specie: Joi.string().valid('chien', 'chat').required(),
  isSterilized: Joi.number().integer().valid(0, 1).required(),
  isTattooedChipped: Joi.number().integer().valid(0, 1).required(),
  userId:Joi.number().integer().required(),
});


const animalsSchema = Joi.array().items(animalSchema);

const validateAnimals = (req, res, next) => {
  const { error } = animalsSchema.validate(req.body, { abortEarly: true });

  if (!error === true) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = validateAnimals;
