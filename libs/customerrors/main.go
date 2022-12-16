package customerrors

import (
	"fmt"
	"time"

	"github.com/getsentry/sentry-go"
)

type Error struct {
	Original       error
	PublicErrorMsg string
	Breadcrumbs    []*sentry.Breadcrumb
}

func (e *Error) AddBreadcrumb(bc *sentry.Breadcrumb) *Error {
	e.Breadcrumbs = append(e.Breadcrumbs, bc)
	return e
}

func (e *Error) Error() string {
	return e.Original.Error()
}

func (e *Error) PublicError() string {
	if len(e.PublicErrorMsg) > 0 {
		return e.PublicErrorMsg
	}
	if e, ok := e.Original.(*Error); ok {
		return e.PublicError()
	}
	return "Unexpected error happend."
}

func (e *Error) SetPublicError(msg string) *Error {
	e.PublicErrorMsg = msg
	e.Breadcrumbs = append(e.Breadcrumbs, &sentry.Breadcrumb{
		Type:      "debug",
		Category:  "error.message",
		Message:   fmt.Sprintf("Error message was changed to %q", msg),
		Data:      nil,
		Level:     sentry.LevelDebug,
		Timestamp: time.Now(),
	})
	return e
}

func New(err error) *Error {
	return &Error{Original: err}
}
