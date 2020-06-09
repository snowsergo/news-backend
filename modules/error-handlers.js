const ValidationError = require('../errors/validation-error');
const ServerError = require('../errors/server-error');

// Обработчик ошибок при создании пользователя
module.exports.createUserHandler = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`Ошибка валидации: ${err.message}`));
  } else next(new ServerError(`При создании пользователя произошла ошибка на сервере: ${err.message}`));
};

// Обработчик ошибок при создании новой карточки
module.exports.createArticleHandler = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`Ошибка валидации: ${err.message}`));
  } else next(new ServerError(`При создании статьи произошла ошибка на сервере: ${err.message}`));
};
