package config

import "os"

type Config struct {
	HTTPAddr     string
	MongoURI     string
	MongoDB      string
	RedisAddr    string
	JWTSecret    string
	CookieName   string
	SecureCookie bool
	StaticDir    string
}

func Load() Config {
	secret := getenv("JWT_SECRET", "ripple-dev-secret-change-in-production")
	addr := getenv("HTTP_ADDR", "127.0.0.1:8081")
	if p := os.Getenv("PORT"); p != "" {
		addr = "0.0.0.0:" + p
	}
	redisAddr := getenv("REDIS_URL", "")
	if redisAddr == "" {
		redisAddr = getenv("REDIS_ADDR", "127.0.0.1:6379")
	}
	mongoURI := getenv("MONGO_URI", "")
	if mongoURI == "" {
		mongoURI = getenv("MONGODB_URI", "mongodb://127.0.0.1:27017")
	}
	return Config{
		HTTPAddr:     addr,
		MongoURI:     mongoURI,
		MongoDB:      getenv("MONGO_DB", "ripple"),
		RedisAddr:    redisAddr,
		JWTSecret:    secret,
		CookieName:   "ripple_token",
		SecureCookie: getenv("COOKIE_SECURE", "") == "1",
		StaticDir:    getenv("STATIC_DIR", ""),
	}
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
