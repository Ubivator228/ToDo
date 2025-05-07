FROM golang:1.23-alpine

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go build -o todo-service

EXPOSE 8082

ENTRYPOINT ["./todo-service"]
