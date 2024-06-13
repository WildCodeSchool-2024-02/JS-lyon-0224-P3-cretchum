const Joi = require("joi");

const signInSchema = Joi.object({
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
  location: Joi.string().min(3).max(255).required(),
  mail: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
  description: Joi.string().min(0).max(800),
});

const validateSignIn = (req, res, next) => {
  const { error } = signInSchema.validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = validateSignIn;
