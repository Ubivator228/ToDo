package main

import (
	"ToDoProject/todo-service/config"
	"ToDoProject/todo-service/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()

	r := gin.Default()
	routes.SetupRoutes(r)

	err := r.Run(":8081")
	if err != nil {
		return
	}
}
