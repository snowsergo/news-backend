const bcrypt = require('bcryptjs'); // для хеширования пароля
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const { createUserHandler } = require('../modules/error-handlers');

const { NODE_ENV, JWT_SECRET } = process.env;

// аутентификация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен с ключем из переменных окружения
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, { // вернем токен в виде http-куки продолжительность жизни 7 дней
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true, //  защита от CSRF атак («межсайтовая подделка запроса»)
      })
        .end(); // если у ответа нет тела, можно использовать метод end
    })
    .catch((err) => next(new AuthError(`Ошибка аутентификации: ${err.message}`)));
};

// создание пользователя
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then(({ _doc }) => {
      const user = _doc;
      delete user.password;
      res.send({ data: user });
    })
    .catch((err) => {
      createUserHandler(err, next);
    });
};

// выдача пользователя по id
module.exports.getUser = (req, res, next) => {
  const owner = req.user._id;
  User.findById(owner)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } throw new NotFoundError(`Пользователь с ID ${owner} не найден`);
    })
    .catch((err) => next(err));
};
