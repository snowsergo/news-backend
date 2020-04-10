const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
// const AutorError = require('../errors/autor-error');
const { createArticleHandler } = require('../modules/error-handlers');

// создание новой  статьи
module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then(({ _doc }) => {
      const newArticle = _doc;
      delete newArticle.owner;
      res.send({ data: newArticle });
    })
    .catch((err) => {
      createArticleHandler(err, next);
    });
};

// выдача всех статей залогиненного пользователя
module.exports.getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (articles.length === 0) {
        throw new NotFoundError('Сохраненных статей у данного пользователя не существует');
      } else {
        res.send({ data: articles });
      }
    })
    .catch((err) => next(err));
};

// удаление статьи
module.exports.deleteArticle = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((userArticles) => {
      if (userArticles.length === 0) {
        throw new NotFoundError('У пользователя нет сохраненных статей');
      } else {
        Article.find({ _id: req.params.articleId })
          .then((articles) => {
            if (articles.length === 0) {
              throw new NotFoundError(`Статьи с ID ${req.params.articleId} не существует`);
            } else {
              Article.findByIdAndRemove(req.params.articleId)
                .then(() => res.status(200).send({ message: 'Статья удалена' }))
                .catch((err) => next(err));
            }
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};
