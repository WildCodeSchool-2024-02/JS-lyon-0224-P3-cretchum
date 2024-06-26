const Joi = require("joi");

const homeStructureSchema = Joi.object({
  isProfessional: Joi.number().required(),
  postalCode: Joi.string().min(5).max(5).required(),
  capacity: Joi.number().min(1).required(),
  price: Joi.number().required(),
  cat: Joi.number().required(),
  dog: Joi.number().required(),
  userId: Joi.number().required(),
});

const validateHomeStructure = (req, res, next) => {
  const { error } = homeStructureSchema.validate(req.body, {
    abortEarly: true,
  });

  if (error !== true) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = validateHomeStructure;
