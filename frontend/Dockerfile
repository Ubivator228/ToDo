# Stage 1: build
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: serve
FROM node:20
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
