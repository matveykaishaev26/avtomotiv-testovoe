FROM node:20-alpine

WORKDIR /app

# Копируем зависимости и устанавливаем
COPY package*.json ./
RUN npm ci

# Копируем весь проект
COPY . .

# Пробрасываем порт Vite
EXPOSE 5173

# Запуск dev сервера, доступного с хоста
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
