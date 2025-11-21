# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: production
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# ⬇️ ВАЖНО — копируем dist, drizzle и конфиг
COPY --from=build /app/dist ./dist
COPY drizzle ./drizzle
COPY drizzle.config.ts ./drizzle.config.ts

EXPOSE 3000

CMD sh -c "npx drizzle-kit migrate && node dist/src/main.js"
