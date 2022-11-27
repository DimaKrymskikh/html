# html
Клиентская часть api на нативном js

## Установка
Нужно выполнить клонирование
```
git@github.com:DimaKrymskikh/html.git
```
а затем команду
```
composer update
```
чтобы установить зависимости php.
Далее нужно создать файл `.env` и скопировать в него содержимое файла `.env.example`. Переменная окружения `API_URL` должна содержать `url` серверной части `api`.

Нужно установить зависимости фронтенда, выполнив команду
```
npm update
```

## Настройка Apache
```
RewriteEngine on
# Если запрашиваемая в URL директория или файл существуют обращаемся к ним напрямую
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Если нет - перенаправляем запрос на index.php
RewriteRule . index.html
```

## Серверное приложение
Url [серверной части api](https://github.com/DimaKrymskikh/api) нужно указать в файле `.env` в переменной `API_URL`.
