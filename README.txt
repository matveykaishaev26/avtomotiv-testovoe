запуск:
    docker compose build 
    docker compose up 
front:
    http://localhost:5173
back:
    http://localhost:3000
оптимизация:
    1. индексы
    2. connection pool - 10 соединений
    3. cursor based pagination
    4. кэширование GET /items в Redis на 60 сек (кешировал самый популярный запрос при limit=20 и cursor=0)

проверил на 10000 запросов с задержкой 2 мс - 138.3 сек сек против 146.6 сек.