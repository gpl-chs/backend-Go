package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gpl-chs/go-jwt/controllers"
	"github.com/gpl-chs/go-jwt/initializers"
	"github.com/gpl-chs/go-jwt/middleware"
)

func init() {

	initializers.LoadEnVariables()
	initializers.ConnectToDB()
	initializers.SynDatabase()
}

func main() {
	r := gin.Default()
	r.Use(middleware.Cors)
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.GET("/login/users", controllers.UsersIndex)
	r.GET("/login/user/:id", controllers.UserShow)
	r.PUT("/login/user/:id", controllers.UserUpdate)
	r.DELETE("/login/user/:id", controllers.UserDelete)

	//	r.GET("/validate", middleware.RequireAuth, controllers.Validate)
	r.Run()
}
