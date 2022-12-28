package groups

type groupDto struct {
	Name string `validate:"required" json:"name"`
}
