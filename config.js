require('dotenv').config(); // модуль для работы с переменными окружения, в них режим, порт, ключ и адрес БД

const {
  PORT, NODE_ENV, JWT_SECRET, MONGO_DB_ADR,
} = process.env;


module.exports = {
  NODE_ENV,
  PORT: PORT || 3000,
  DB_ADR: NODE_ENV === 'production' ? MONGO_DB_ADR : 'mongodb://localhost:27017/newsdb',
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'some-dev-secret',
};
