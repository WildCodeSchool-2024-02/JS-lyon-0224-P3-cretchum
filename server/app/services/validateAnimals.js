const Joi = require("joi");

const animalsSchema = Joi.object({
  name: Joi.string().min(2).max(55).required(),
  age: Joi.number().required(),
  breed: Joi.string().min(2).max(55).required(),
  species: Joi.string().valid("chat", "chien").required(),
  isSterilized: Joi.number().integer().valid(0, 1).required(),
});

const validateAnimals = (req, res, next) => {
  const { error } = animalsSchema.validate(req.body, { abortEarly: true });

  if (!error === true) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = validateAnimals;