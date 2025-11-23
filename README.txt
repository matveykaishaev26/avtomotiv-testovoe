запуск:
    docker compose build 
    docker compose up 
front:
    http://localhost:5173
back:
    http://localhost:3000
оптимизация:
    1. индексы
    2. connection pool
    3. cursor based pagination
    4. redis кеширование

после оптимизации все начало работать быстрее и без задержек. проверил на 10000 запросов с задержкой 1 мс - раннее были выдимые тормоза.