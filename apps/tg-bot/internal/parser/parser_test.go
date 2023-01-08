package parser

import (
	"strings"
	"testing"
	"time"
)

var testTime time.Time

func TestMain(m *testing.M) {
	testTime, err := time.Parse("2006-01-02", "2022-12-27")
	if err != nil {
		panic("Invalid data string passed")
	}

	m.Run()
}

func Test_ParseMessage_BadFormat(t *testing.T) {
	msg := "{\"facultId\":11,\"isNe\":true,\"isUpdated\":true,\"weekBegin\":\"2022-12-26T00:00:00.000Z\",\"weekEnd\":\"2023-01-01T00:00:00.000Z\",\"link\":\"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls'}\""
	respMsg, err := ParseMessage(msg)
	if err == nil {
		t.Error("incorrect result: expected error for invalid message")
	}
}

func Test_ParseMessage_NewlyCreated(t *testing.T) {
	msg := "{\"facultyId\":11,\"isNew\":true,\"isUpdated\":true,\"weekBegin\":\"2022-12-26T00:00:00.000Z\",\"weekEnd\":\"2023-01-01T00:00:00.000Z\",\"link\":\"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls'}\""
	respMsg, err := ParseMessage(msg)
	if err != nil {
		t.Error("incorrect result: expected newly created response")
	}

	if !strings.Contains(respMsg, "текущую") {
		t.Error("incorrect result: response must be for current week")
	}

	if !strings.Contains(respMsg, "новое") {
		t.Error("incorrect result: response must contains info about new table")
	}
}

func Test_ParseMessage_Updated(t *testing.T) {
	msg := "{\"facultyId\":11,\"isNew\":false,\"isUpdated\":true,\"weekBegin\":\"2022-12-26T00:00:00.000Z\",\"weekEnd\":\"2023-01-01T00:00:00.000Z\",\"link\":\"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls'}\""
	respMsg, err := ParseMessage(msg)
	if err != nil {
		t.Error("incorrect result: expected updated table response")
	}

	if !strings.Contains(respMsg, "текущую") {
		t.Error("incorrect result: response must be for current week")
	}

	if !strings.Contains(respMsg, "обновилось") {
		t.Error("incorrect result: response must contains info about new table")
	}
}

func Test_ParseMessage_NewlyCreated_NextWeek(t *testing.T) {

}

func Test_ParseMessage_Updated_NextWeek(t *testing.T) {

}
