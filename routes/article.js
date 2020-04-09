const router = require('express').Router();
const { articlePostValidation, articleDeleteValidation } = require('../modules/validators');
const {
  getAllArticles, createArticle, deleteArticle,
} = require('../controllers/article');

// запрос всех статей
router.get('/', getAllArticles);

//  создание статьи с переданым в теле keyword, title, text, date, source, link и image
router.post('/', articlePostValidation, createArticle);

//  удаление статьи по id
router.delete('/:articleId', articleDeleteValidation, deleteArticle);

module.exports = router;
