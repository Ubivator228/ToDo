# stage 1: build frontend
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# stage 2: nginx server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
