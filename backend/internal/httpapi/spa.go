package httpapi

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

// AttachStatic serves the built React app from dir (production image).
func AttachStatic(r *gin.Engine, dir string) {
	if strings.TrimSpace(dir) == "" {
		return
	}
	r.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api") {
			c.JSON(http.StatusNotFound, gin.H{"error": "Not found."})
			return
		}
		clean := filepath.Clean(c.Request.URL.Path)
		if clean == "/" || clean == "." {
			c.File(filepath.Join(dir, "index.html"))
			return
		}
		full := filepath.Join(dir, strings.TrimPrefix(clean, "/"))
		if info, err := os.Stat(full); err == nil && !info.IsDir() {
			c.File(full)
			return
		}
		c.File(filepath.Join(dir, "index.html"))
	})
}
