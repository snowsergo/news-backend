const router = require('express').Router();
const routerusers = require('./users');
const routerarticle = require('./article.js');
const NotFoundError = require('../errors/not-found-error');
const { userSignin, userSignup } = require('../modules/validators');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

const messages = require('../modules/text-constants');

router.post('/signin', userSignin, login); // проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signup', userSignup, createUser); // создаёт пользователя с переданными в теле email, password и name

router.use(auth); // аутентификация пользователя перед всеми роутами

router.use('/users/me', routerusers);
router.use('/articles', routerarticle);


// запрос на несуществующий адрес
router.all('*', () => {
  throw new NotFoundError(messages.invalidRoute);
});

module.exports = router;
