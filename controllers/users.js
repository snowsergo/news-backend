const bcrypt = require('bcryptjs'); // для хеширования пароля
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const mailer = require('../modules/nodemailer');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const { createUserHandler } = require('../modules/error-handlers');
const messages = require('../modules/text-constants');



// const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET } = require('../config');

// аутентификация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user.activated) {
        // создадим токен с ключем из переменных окружения
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('jwt', token, { // вернем токен в виде http-куки продолжительность жизни 7 дней
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true, //  защита от CSRF атак («межсайтовая подделка запроса»)
        })
          .end(); // если у ответа нет тела, можно использовать метод end
      } else {
      // нет подтверждения email
        next(new AuthError(`${messages.authFailed} ${'Требуется подтверждение email'}`));
      }
    })
    .catch((err) => next(new AuthError(`${messages.authFailed} ${err.message}`)));
};

// создание пользователя
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, // записываем хеш в базу
      activated: false,
    }))
    .then(({ _doc }) => {
      const user = _doc;
      delete user.password;
      res.send({ data: user });
      const message = {
      // from: 'Mailer Test <evangeline.white@ethereal.email>',
        to: req.body.email,
        subject: 'test',
        text: `test:

        данные учетной записи:
        email: ${req.body.email}
        password: ${req.body.password}

        для подтверждения перейдите по сслыке
        http://localhost:3000/email/${req.body.email}
        `,
      };
      mailer(message);
    })
    .catch((err) => {
      createUserHandler(err, next);
    });
};


// активация пользователя
module.exports.activateUser = (req, res, next) => {
  console.log(req.params.email);
  User.findOneAndUpdate({ email: req.params.email}, { activated: true },{
    new: true, // обработчик then получит на вход обновлённую запись
})
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));

};

// выдача пользователя по id
module.exports.getUser = (req, res, next) => {
  const owner = req.user._id;
  User.findById(owner)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } throw new NotFoundError(`${messages.notFoundUser} ${owner} `);
    })
    .catch((err) => next(err));
};
