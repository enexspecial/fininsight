package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/sirupsen/logrus"

	"fininsight/golang-service/internal/config"
	"fininsight/golang-service/internal/handlers"
	"fininsight/golang-service/internal/middleware"
	"fininsight/golang-service/internal/repository"
	"fininsight/golang-service/internal/service"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Setup logging
	logrus.SetLevel(logrus.InfoLevel)
	if cfg.Debug {
		logrus.SetLevel(logrus.DebugLevel)
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize database
	db, err := repository.NewDatabase(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Initialize Redis
	redisClient, err := repository.NewRedisClient(cfg.RedisURL)
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}

	// Initialize repositories
	userRepo := repository.NewUserRepository(db)
	financialRepo := repository.NewFinancialRepository(db)

	// Initialize services
	userService := service.NewUserService(userRepo, redisClient)
	financialService := service.NewFinancialService(financialRepo, redisClient)

	// Initialize handlers
	userHandler := handlers.NewUserHandler(userService)
	financialHandler := handlers.NewFinancialHandler(financialService)

	// Setup router
	router := gin.New()

	// Middleware
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.CORS())
	router.Use(middleware.RequestID())
	router.Use(middleware.Prometheus())

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":    "healthy",
			"timestamp": time.Now().Unix(),
		})
	})

	// Metrics endpoint
	router.GET("/metrics", gin.WrapH(promhttp.Handler()))

	// API routes
	api := router.Group("/api/v1")
	{
		// User routes
		users := api.Group("/users")
		{
			users.POST("/register", userHandler.Register)
			users.POST("/login", userHandler.Login)
			users.GET("/profile", middleware.AuthMiddleware(), userHandler.GetProfile)
		}

		// Financial routes
		financial := api.Group("/financial")
		{
			financial.GET("/data", middleware.AuthMiddleware(), financialHandler.GetData)
			financial.POST("/data", middleware.AuthMiddleware(), financialHandler.CreateData)
			financial.GET("/analytics", middleware.AuthMiddleware(), financialHandler.GetAnalytics)
		}
	}

	// Root endpoint
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message":   "Welcome to FinInsight Go Service! 🐹",
			"version":   "1.0.0",
			"timestamp": time.Now().Unix(),
		})
	})

	// Start server
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.Port),
		Handler: router,
	}

	// Graceful shutdown
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	logrus.Infof("🚀 FinInsight Go Service is running on port %d", cfg.Port)

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logrus.Info("Shutting down server...")

	// Graceful shutdown with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logrus.Fatal("Server forced to shutdown:", err)
	}

	logrus.Info("Server exited")
} 