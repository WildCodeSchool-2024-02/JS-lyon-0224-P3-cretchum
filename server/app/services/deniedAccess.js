const jwt = require("jsonwebtoken");

const deniedAccess = (req, res, next) => {
  const token = req.cookies.cretchomCookie;

  try {
    if (token === undefined) {
      return res.status(401).json({ error: "Access denied" });
    }
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.user = decoded;

    const userId = req.params.id;

    if (parseInt(req.user.sub, 10) !== parseInt(userId, 10)) {
      return res.status(403).json({
        validationErrors: [
          { message: "Vous n'êtes pas autorisé à effectuer cette action" },
        ],
      });
    }
    return next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = deniedAccess;
