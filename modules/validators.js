const { celebrate, Joi } = require('celebrate');

// валидация запросов при входе пользователя
module.exports.userSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// валидация запросов при создании пользователя
module.exports.userSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// валидация запросов при создании статьи
module.exports.articlePostValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2).max(30),
    source: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(12).max(30),
    image: Joi.string().required().min(12),
  }),
});
// валидация запросов при удалении статьи
module.exports.articleDeleteValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});
