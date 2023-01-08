package parser

import (
	"strings"
	"testing"
	"time"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/di"
	"github.com/go-playground/validator"
	"github.com/samber/do"
)

var testTime time.Time

func TestMain(m *testing.M) {
	validator := validator.New()
	do.ProvideValue(di.Provider, *validator)

	tt, err := time.Parse("2006-01-02", "2022-12-27")
	if err != nil {
		panic("Invalid data string passed")
	}
	testTime = tt

	m.Run()
}

func Test_ParseMessage_BadFormat(t *testing.T) {
	msg := `{"facultId":11,"isNew":true,"isUpdated":true,"weekBegin":"2022-12-26T00:00:00.000Z","weekEnd":"2023-01-01T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
	_, err := ParseMessage(msg, testTime)
	if err == nil {
		t.Fatalf("incorrect result: %v", err)
	}
}

func Test_ParseMessage_ValidFormat(t *testing.T) {
	msg := `{"facultyId":11,"isNew":false,"isUpdated":true,"weekBegin":"2022-12-26T00:00:00.000Z","weekEnd":"2023-01-01T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
	_, err := ParseMessage(msg, testTime)
	if err != nil {
		t.Fatalf("incorrect result: %v", err)
	}
}

func Test_ParseMessage_NewlyCreated(t *testing.T) {
	msg := `{"facultyId":11,"isNew":true,"isUpdated":false,"weekBegin":"2022-12-26T00:00:00.000Z","weekEnd":"2023-01-01T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
	resMsg, err := ParseMessage(msg, testTime)
	if err != nil {
		t.Fatalf("incorrect result: %v", err)
	}
	t.Log(resMsg)
	if !strings.Contains(resMsg.Message, "текущую") {
		t.Error("incorrect result: response must be for current week")
	}

	if !strings.Contains(resMsg.Message, "Появилось") {
		t.Error("incorrect result: response must contains info about new table")
	}
}

func Test_ParseMessage_Updated(t *testing.T) {
	msg := `{"facultyId":11,"isNew":false,"isUpdated":true,"weekBegin":"2022-12-26T00:00:00.000Z","weekEnd":"2023-01-01T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
	resMsg, err := ParseMessage(msg, testTime)
	if err != nil {
		t.Fatalf("incorrect result: %v", err)
	}
	if !strings.Contains(resMsg.Message, "текущую") {
		t.Error("incorrect result: response must be for current week")
	}

	if !strings.Contains(resMsg.Message, "Обновилось") {
		t.Error("incorrect result: response must contains info about new table")
	}
}

func Test_ParseMessage_UpdatedAndCreated(t *testing.T) {
	msg := `{"facultyId":11,"isNew":true,"isUpdated":true,"weekBegin":"2022-12-26T00:00:00.000Z","weekEnd":"2023-01-01T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
	_, err := ParseMessage(msg, testTime)
	if err == nil {
		t.Fatalf("incorrect result: must be error")
	}
}

func Test_ParseMessage_NewlyCreated_NextWeek(t *testing.T) {
	msg := `{"facultyId":11,"isNew":true,"isUpdated":false,"weekBegin":"2023-01-01T00:00:00.000Z","weekEnd":"2023-01-08T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
	resMsg, err := ParseMessage(msg, testTime)
	if err != nil {
		t.Fatalf("incorrect result: %v", err)
	}
	if !strings.Contains(resMsg.Message, "следущую") {
		t.Error("incorrect result: response must be for next week")
	}

	if !strings.Contains(resMsg.Message, "Появилось") {
		t.Error("incorrect result: response must contains info about new table")
	}
}

func Test_ParseMessage_Updated_NextWeek(t *testing.T) {
	msg := `{"facultyId":11,"isNew":false,"isUpdated":true,"weekBegin":"2023-01-01T00:00:00.000Z","weekEnd":"2023-01-08T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
	resMsg, err := ParseMessage(msg, testTime)
	if err != nil {
		t.Fatalf("incorrect result: %v", err)
	}
	if !strings.Contains(resMsg.Message, "следущую") {
		t.Error("incorrect result: response must be for current week")
	}

	if !strings.Contains(resMsg.Message, "Обновилось") {
		t.Error("incorrect result: response must contains info about new table")
	}
}

func Test_ParseMessage_PastWeek(t *testing.T) {
	msg := `{"facultyId":11,"isNew":false,"isUpdated":true,"weekBegin":"2022-12-20T00:00:00.000Z","weekEnd":"2022-12-26T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
	resMsg, err := ParseMessage(msg, testTime)
	if err != nil {
		t.Fatalf("incorrect result: %v", err)
	}
	t.Log(resMsg)
	if resMsg.Message != "" {
		t.Fatal("Must be empty message")
	}
}
