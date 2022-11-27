package jwt

const (
	tokenTypeAccessToken tokenType = "access_token"
	tokenTypeRefreshToken tokenType = "refresh_token"
)

type tokenType string

type Token struct {
	Id uint `mapstructure:"id" json:"id"`
	IssuedAtRaw int64 `mapstructure:"iat" json:"iat"`
	ExpiresAtRaw int64 `mapstructure:"exp" json:"exp"`
}