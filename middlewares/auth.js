const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const AuthError = require('../errors/auth-error');
const messages = require('../modules/text-constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError(messages.authNeeded);
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
