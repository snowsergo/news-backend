const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET } = require('../config');
const AuthError = require('../errors/auth-error');
const messages = require('../modules/text-constants');
// eslint-disable-next-line consistent-return
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
