const Joi = require("joi");

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const validateForgotPassword = (req, res, next) => {
    const { error } = forgotPasswordSchema.validate(req.body, { abortEarly: true });
  
    if (error === undefined) {
      next();
    } else {
      res.status(400).json({ validationErrors: error.details });
    }
  };
  
  module.exports = validateForgotPassword;