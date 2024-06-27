const jwt = require("jsonwebtoken");

const deniedAcced = (req, res, next) => {
  const token = req.cookies.cookie;

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.user = decoded;

    const userId = req.params.id;

    if (req.user.sub !== parseInt(userId, 10)) {
      return res.sendStatus(403);
    }
    return next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = deniedAcced;
