# Сервер на Express
Учебный сервер,  обеспечивающий работу с пользователями и статьями

## Текущая версия
1.0.1

## Ссылки на приложение
- [https://www.snowsergo-news.tk](https://www.snowsergo-news.tk)
- [https://snowsergo-news.tk](https://snowsergo-news.tk)
- [https://84.201.169.244](https://84.201.169.244)


## Адреса для отправки запросов
- [https://www.snowsergo-news.tk/api](https://www.snowsergo-news.tk/api)
- [https://snowsergo-news.tk/api](https://snowsergo-news.tk/api)

## Функционол

### version 1.0.1
- rate-limiter вынесен в отдельный модуль
- добавлен публичный ip адрес 84.201.169.244

### version 1.0.0
- создание пользователя POST /signup
- авторизация пользователя POST /signin
- возвращение данных пользователя GET /users/me
- сохранение новости на сервере POST /articles
- удаление новости на сервере DELETE /articles/articleId
- возвращение всех сохраненных новостей GET /articles
- запросы можно проверить в postman по адресу http://localhost:3000 в dev режиме

## Установка проекта

Скопируйте проект на компьютер:

```
git clone https://github.com/snowsergo/news-backend.git
```

Установите зависимости проекта:

```
npm i
```

Отправляйте запросы вида:

```
http://localhost:3000/signup (POST)
http://localhost:3000/signin (POST)
http://localhost:3000/users/me (GET)
http://localhost:3000/articles (GET)
http://localhost:3000/articles (POST)
http://localhost:3000/articles/id (DELETE)


```

## Работа

Режим development:

Сборка для сервера c hot-reload (nodemon)

```
npm run dev
```

Режим development:

Сборка для сервера без hot-reload

```
npm run start
```
