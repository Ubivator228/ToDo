# Шаг 1: Установка зависимостей
FROM node:18 as dependencies  
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent

# Шаг 2: Сборка приложения
FROM node:18 as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Устанавливаем полифилы для криптографии
RUN npm install --save-dev vite-plugin-node-polyfills
RUN echo "import { defineConfig } from 'vite'; \
import { nodePolyfills } from 'vite-plugin-node-polyfills'; \
export default defineConfig({ plugins: [nodePolyfills()] });" > vite.config.js

RUN npm run build

# Шаг 3: Продакшен образ
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80