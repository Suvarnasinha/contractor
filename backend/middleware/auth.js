// middlewares/auth.js

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userid = decoded.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
