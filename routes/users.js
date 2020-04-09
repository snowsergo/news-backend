const router = require('express').Router(); // создали роутер
const { getUser } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/', getUser);

module.exports = router;
