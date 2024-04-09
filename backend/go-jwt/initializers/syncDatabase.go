package initializers

import "github.com/gpl-chs/go-jwt/models.go"

func SynDatabase() {
	DB.AutoMigrate(&models.User{})
}
