package watcher

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
	"github.com/danilluk1/shgpu-table/apps/parser/internal/types"
)

var faculties = []types.Faculty{
	{
		Link: "https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/",
	},
}

func ParsePages() {
	for _, faculty := range faculties {
		res := parsePage(faculty)
		links := getTablesLinks(res, 3)
		fmt.Println(links)
	}
}

func parsePage(faculty types.Faculty) *io.ReadCloser {
	res, err := http.Get(faculty.Link)
	if err != nil {
		log.Fatal(err)
	}
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	return &res.Body
}

func getTablesLinks(reader *io.ReadCloser, count int) (slice []string) {
	doc, err := goquery.NewDocumentFromReader(*reader)
	if err != nil {
		log.Fatal(err)
	}
	res := []string{}
	doc.Find(
		`body > section > div.container > div 
		> div.col-md-9.col-hd-9.slide_col_full > div 
		> div.full-news > div > p > a`,
	).Each(func(i int, s *goquery.Selection) {
		link := s.AttrOr("href", "")
		if i < count {
			res = append(res, link)
		}
	})
	defer (*reader).Close()
	return res
}
