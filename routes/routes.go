package routes

import (
	"ToDoProject/controllers"
	"ToDoProject/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.GET("/todos/completed", controllers.GetCompletedTodos)
	r.PATCH("/todos/:id/complete", controllers.MarkTodoCompleted)
	r.GET("/me", controllers.GetCurrentUser)
	r.GET("/stats", controllers.GetStats)

	auth := r.Group("/").Use(middleware.AuthMiddleware())
	{
		auth.GET("/todos", controllers.GetTodos)
		auth.POST("/todos", controllers.CreateTodo)
		auth.PUT("/todos/:id", controllers.UpdateTodo)
		auth.DELETE("/todos/:id", controllers.DeleteTodo)

	}
}
