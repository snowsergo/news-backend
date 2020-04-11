const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /^https?:\/\/(www\.)?[a-z]+\.[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)$/.test(link),
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /^https?:\/\/(www\.)?[a-z]+\.[a-z]+(((\/(\d|[a-zA-Z]))((-|=|\?|\.)?([a-zA-Z]|\d))*)+)(\.(?:jpg|jpeg|png))?$/.test(link),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
