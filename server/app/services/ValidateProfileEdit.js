const Joi = require("joi");

const profileSchema = Joi.object({
  lastname: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(2)
    .max(55)
    .required(),
  firstname: Joi.string()
    .pattern(/^[a-zA-ZÀ-ÿ\s']+$/)
    .min(2)
    .max(55)
    .required(),
  username: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/[0-9]/, { name: "numbers" })
    .min(10)
    .max(10)
    .required(),
  location: Joi.string().min(3).max(55).required(),
  mail: Joi.string().email().required(),
  description: Joi.string().min(0).max(800),
});

const validateProfileEdit = (req, res, next) => {
  const { error } = profileSchema.validate(req.body, { abortEarly: true });

  if (!error === true) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = validateProfileEdit;
