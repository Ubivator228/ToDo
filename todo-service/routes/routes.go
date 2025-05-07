package routes

import (
	"ToDoProject/todo-service/controllers"
	"ToDoProject/todo-service/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())
	{
		auth.GET("/todos", controllers.GetTodos)
		auth.POST("/todos", controllers.CreateTodo)
		auth.PUT("/todos/:id", controllers.UpdateTodo)
		auth.DELETE("/todos/:id", controllers.DeleteTodo)

		auth.GET("/todos/completed", controllers.GetCompletedTodos)
		auth.PATCH("/todos/:id/complete", controllers.MarkTodoCompleted)
		auth.GET("/stats", controllers.GetStats)

		auth.GET("/todos/:id", controllers.GetTodoByID)
		auth.GET("/todos/search", controllers.SearchTodos)
		auth.GET("/todos/sort", controllers.SortTodos)
		auth.GET("/todos/pagination", controllers.PaginateTodos)
		auth.PATCH("/todos/:id/title", controllers.UpdateTodoTitle)
		auth.PATCH("/todos/:id/description", controllers.UpdateTodoDescription)
		auth.PATCH("/todos/:id/due_date", controllers.UpdateTodoDueDate)
		auth.DELETE("/todos", controllers.DeleteAllTodos)
		auth.GET("/users/:id/todos", controllers.GetTodosByUserID)
	}
}
