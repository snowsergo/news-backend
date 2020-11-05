# Сервер на Express
Учебный сервер,  обеспечивающий работу с пользователями и статьями

## Текущая версия
1.0.3


### version 1.0.3
- данные конфигурации импортируются из .env в confg.js и затем в приложение
- добавлена валидация имени пользователя, ссылки и изображения статьи в запросах
- глобальный роут импортируется из файла index.js
- текстовые константы вынесены в отдельный файл


### version 1.0.2
- изменена валидация имени пользователя, теперь можно писать имя с маленькой буквы


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
