package admins

type adminDto struct {
	Name         string `validate:"required" json:"name"`
	Id           uint32 `validate:"required" json:"id"`
	RefreshToken string `validate:"required" json:"refresh_token"`
	AccessToken  string `validate:"required" json:"access_token"`
}

type loginDto struct {
	Login string `validate:"required" json:"login"`
	Pass  string `validate:"required" json:"pass"`
}

type refreshDto struct {
	RefreshToken string `validate:"required" json:"refresh_token"`
}
