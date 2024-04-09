package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gpl-chs/go-jwt/initializers"
	"github.com/gpl-chs/go-jwt/models.go"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Signup(c *gin.Context) {
	//Get the email/password off reuest body
	var body struct {
		Name          string
		Email         string
		Password      string
		DateOfJoining string
		Admin         *bool
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	//Hash password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 5)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	//Create the user
	user := models.User{
		Model:         gorm.Model{},
		Name:          body.Name,
		Email:         body.Email,
		Password:      string(hash),
		DateOfJoining: body.DateOfJoining,
		Admin:         body.Admin,
	}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
		return
	}
	//Respond
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Registration successful", "user": user})

}
func Login(c *gin.Context) {
	// get the email and pass off req body
	var body struct {
		Email    string
		Password string
	}
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	// Look up requested user
	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email of password",
		})
		return
	}

	// Compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Login successful", "user": user})
}

func UsersIndex(c *gin.Context) {
	//Get the Users
	var users []models.User
	initializers.DB.Find(&users)

	//Respond them
	c.JSON(200, gin.H{
		"users": users,
	})
}
func UserShow(c *gin.Context) {

	// Get id of url
	id := c.Param("id")
	//Get the user
	var user models.User
	initializers.DB.First(&user, id)

	//Respond them
	c.JSON(200, gin.H{
		"user": user,
	})
}
func UserUpdate(c *gin.Context) {
	// Get id from URL
	id := c.Param("id")

	// Parse request body
	var body struct {
		Name          string
		Email         string
		Password      string
		DateOfJoining string
		Admin         *bool
	}
	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find the user to update
	var user models.User
	if err := initializers.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Update user fields
	updatedUser := models.User{
		Name:          body.Name,
		Email:         body.Email,
		Password:      body.Password,
		DateOfJoining: body.DateOfJoining,
		Admin:         body.Admin,
	}
	if err := initializers.DB.Model(&user).Updates(updatedUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return

	}

	// Respond with updated user
	c.JSON(http.StatusOK, gin.H{"user": user})
}

func UserDelete(c *gin.Context) {

	// Get id of url
	id := c.Param("id")
	//delete it
	initializers.DB.Delete(&models.User{}, id)

	//Respond
	c.Status(200)
}

/*

	// Generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	//sent it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")
	//user.(models.User).Email
	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}
*/
