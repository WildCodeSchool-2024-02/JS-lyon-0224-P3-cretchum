const jwt = require('jsonwebtoken');

const authActions = async (req, res) => {
  const token = req.cookies.cookie;

   try {
    if (token === undefined) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    req.user = decoded;
   return res.json({ user: req.user });
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {authActions};
