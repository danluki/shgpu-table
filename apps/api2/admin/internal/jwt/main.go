package jwt

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
	"github.com/golang-jwt/jwt/v4"
	"github.com/mitchellh/mapstructure"
)

type signResult struct {
	Token     string
	ExpiresAt time.Time
}

type JwtToken struct {
	AccessToken  *signResult
	RefreshToken *signResult
}

var signMethod = jwt.SigningMethodHS256

func CreateToken(adminId uint) (*JwtToken, error) {
	accessToken, err := sign(&Token{
		Id: adminId,
	}, 30*time.Minute, tokenTypeAccessToken)

	if err != nil {
		return nil, err
	}

	refreshToken, err := sign(map[string]interface{}{}, 30*24*time.Hour, tokenTypeRefreshToken)
	if err != nil {
		return nil, err
	}

	return &JwtToken{AccessToken: : }
}

func sign(
	payload interface{},
	expIn time.Duration,
	tokenType tokenType,
) (*signResult, error) {
	bytes, err := json.Marshal(payload)

	if err != nil {
		return nil, err
	}

	var pmap map[string]interface{}
	if err := json.Unmarshal(bytes, &pmap); err != nil {
		return nil, err
	}

	expAt := time.Now().Add(expIn)

	pmap["iat"] = time.Now().Unix()
	pmap["exp"] = expAt.Unix()
	pmap["type"] = tokenType

	t, err := jwt.NewWithClaims(signMethod, jwt.MapClaims(pmap)).SignedString(config.GetJwtSecret())

	if err != nil {
		return nil, err
	}

	return &signResult{Token: t, ExpiresAt: expAt}, nil
}

func DecodeAccessToken(token string) (*Token, error) {
	return decode[Token](token, tokenTypeAccessToken)
}

func DecodeRefreshToken(token string) (*Token, error) {
	_, err := decode[interface{}](token, tokenTypeUserRefreshToken)
	return err
}

func decode[T interface{}](seq string, tt tokenType) (*T, error) {
	token, err := jwt.Parse(seq, func(token *jwt.Token) (interface{}, error) {
		alg, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		if alg != signMethod {
			return nil, errors.New("unexpected alg found")
		}

		return config.GetJwtSecret(), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("token is invalid")
	}

	payload, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		return nil, errors.New("payload is invalid")
	}

	var payloadTt tokenType

	if vInf, ok := payload["type"]; ok {
		if v, ok := vInf.(string); ok {
			payloadTt = tokenType(v)
		}
	}

	if payloadTt != tt {
		return nil, errors.New("incorrect token type")
	}

	var data T
	if err := mapstructure.Decode(payload, &data); err != nil {
		return nil, errors.New("payload has unexpected format")
	}
	return &data, nil
}
