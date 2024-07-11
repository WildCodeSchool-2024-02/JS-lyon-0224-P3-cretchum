const checkIsHomeStructure = (req, res, next) => {
  const {isHomeStructure} = req.user;
  
    if (isHomeStructure === true) {
      return res.status(403).json({
        validationErrors: [
          { message: "Vous ne pouvez pas avoir plus d'une structure par compte" },
        ],
      });
    }
    return next();
};

module.exports = checkIsHomeStructure;
