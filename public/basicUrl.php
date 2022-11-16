<?php

require_once __DIR__ . '/../vendor/autoload.php';

/**
 * Загружаем из файла .env переменные среды, хранящие параметры конфигурации
 */
$dotenv = Dotenv\Dotenv::createUnsafeImmutable(dirname(__DIR__));
$dotenv->load();

echo getenv('API_URL');
