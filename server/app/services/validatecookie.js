const jwt = require('jsonwebtoken');

const validatecookie = (req, res, next) => {
  const token = req.cookies.cookie;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    req.user = decoded;
    return next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = validatecookie;
