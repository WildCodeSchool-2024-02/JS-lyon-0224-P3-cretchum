const Joi = require("joi");

const loginSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
});

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = validateLogin;