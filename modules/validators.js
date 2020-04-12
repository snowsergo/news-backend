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
    name: Joi.string().required().min(2).max(30)
      .regex(/(^[А-ЯЁ][а-яё]+(( [А-ЯЁ][а-яё]+)+)?$)|(^[A-Z][a-z]+(( [A-Z][a-z]+)+)?$)|(^[a-z][a-z]+(( [a-z][a-z]+)+)?$)|(^[а-яё][а-яё]+(( [а-яё][а-яё]+)+)?$)/),
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
    link: Joi.string().required().regex(/^https?:\/\/(www\.)?[a-z]+\.[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)$/),
    image: Joi.string().required().regex(/^https?:\/\/(www\.)?[a-z]+\.[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)(\.(?:jpg|jpeg|png))?$/),
  }),
});
// валидация запросов при удалении статьи
module.exports.articleDeleteValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});
