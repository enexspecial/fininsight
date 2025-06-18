# FinInsight Monorepo Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Services](#services)
4. [Getting Started](#getting-started)
5. [Development](#development)
6. [Deployment](#deployment)
7. [Monitoring](#monitoring)
8. [API Documentation](#api-documentation)
9. [Contributing](#contributing)

## 🏗️ Overview

FinInsight is a comprehensive financial insights platform built as a monorepo with multiple services:

- **NestJS API** - Main REST API service
- **Python Service** - Data processing and analytics
- **Go Service** - High-performance microservice
- **LangChain App** - AI-powered frontend application

## 🏛️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   LangChain     │    │   NestJS API    │    │  Python Service │
│     App         │◄──►│   (Port 3000)   │◄──►│   (Port 8001)   │
│  (Port 3001)    │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Go Service    │    │   PostgreSQL    │
                       │  (Port 8080)    │    │   Database      │
                       └─────────────────┘    └─────────────────┘
                                │                       │
                                └───────┬───────────────┘
                                        ▼
                               ┌─────────────────┐
                               │     Redis       │
                               │     Cache       │
                               └─────────────────┘
```

## 🚀 Services

### NestJS API Service

**Location**: `services/nestjs-api/`
**Port**: 3000
**Technology**: NestJS, TypeScript, TypeORM, PostgreSQL

**Features**:
- RESTful API endpoints
- Authentication & Authorization
- Database integration
- Swagger documentation
- Rate limiting
- Health checks

**Key Endpoints**:
- `GET /` - API information
- `GET /health` - Health check
- `GET /api` - Swagger documentation
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/users/profile` - User profile

### Python Service

**Location**: `services/python-service/`
**Port**: 8001
**Technology**: FastAPI, Python, SQLAlchemy, Pandas

**Features**:
- Data processing and analytics
- Financial calculations
- Machine learning models
- Prometheus metrics
- Structured logging

**Key Endpoints**:
- `GET /` - Service information
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `POST /api/v1/analytics` - Financial analytics

### Go Service

**Location**: `services/golang-service/`
**Port**: 8080
**Technology**: Gin, Go, GORM, PostgreSQL

**Features**:
- High-performance microservice
- Database operations
- Redis caching
- Prometheus metrics
- Graceful shutdown

**Key Endpoints**:
- `GET /` - Service information
- `GET /health` - Health check
- `GET /metrics` - Prometheus metrics
- `POST /api/v1/users/register` - User registration

### LangChain App

**Location**: `apps/langchain-app/`
**Port**: 3001
**Technology**: Next.js, React, LangChain, Tailwind CSS

**Features**:
- AI-powered financial insights
- Interactive chat interface
- Real-time data visualization
- Modern UI/UX
- Responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Go 1.21+
- Docker & Docker Compose
- pnpm (recommended) or npm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fininsight
   ```

2. **Install dependencies**
   ```bash
   # Install Node.js dependencies
   pnpm install

   # Install Python dependencies
   cd services/python-service
   pip install -r requirements.txt

   # Install Go dependencies
   cd services/golang-service
   go mod tidy
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start with Docker**
   ```bash
   docker-compose up --build
   ```

5. **Or start individually**
   ```bash
   # Start all services
   pnpm dev

   # Start individual services
   pnpm dev:nestjs
   pnpm dev:python
   pnpm dev:golang
   pnpm dev:langchain
   ```

## 💻 Development

### Project Structure

```
fininsight/
├── apps/
│   └── langchain-app/          # Next.js + LangChain app
├── services/
│   ├── nestjs-api/            # NestJS REST API
│   ├── python-service/        # FastAPI Python service
│   └── golang-service/        # Gin Go service
├── shared/                    # Shared utilities and types
├── docs/                      # Documentation
├── scripts/                   # Build and deployment scripts
├── monitoring/                # Prometheus and Grafana configs
├── docker-compose.yml         # Docker orchestration
└── package.json               # Root package.json
```

### Development Commands

```bash
# Install dependencies
pnpm install

# Development mode
pnpm dev                    # Start all services
pnpm dev:nestjs            # Start NestJS only
pnpm dev:python            # Start Python only
pnpm dev:golang            # Start Go only
pnpm dev:langchain         # Start LangChain app only

# Building
pnpm build                 # Build all services
pnpm build:nestjs          # Build NestJS
pnpm build:langchain       # Build LangChain app

# Testing
pnpm test                  # Run all tests
pnpm test:nestjs           # Test NestJS
pnpm test:python           # Test Python
pnpm test:golang           # Test Go

# Linting
pnpm lint                  # Lint all services
pnpm lint:nestjs           # Lint NestJS
pnpm lint:python           # Lint Python
pnpm lint:golang           # Lint Go

# Docker
pnpm docker:build          # Build all Docker images
pnpm docker:up             # Start all services with Docker
pnpm docker:down           # Stop all services
```

### Code Style

- **TypeScript/JavaScript**: ESLint + Prettier
- **Python**: Black + isort + flake8
- **Go**: golangci-lint
- **General**: Prettier for formatting

## 🚀 Deployment

### Docker Deployment

```bash
# Build and run all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

1. **Environment Setup**
   ```bash
   # Set production environment variables
   export NODE_ENV=production
   export DATABASE_URL=your_production_db_url
   export REDIS_URL=your_production_redis_url
   ```

2. **Build Production Images**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

3. **Deploy**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## 📊 Monitoring

### Prometheus

- **URL**: http://localhost:9090
- **Configuration**: `monitoring/prometheus.yml`
- **Metrics**: All services expose Prometheus metrics

### Grafana

- **URL**: http://localhost:3002
- **Username**: admin
- **Password**: admin
- **Dashboards**: Pre-configured dashboards for all services

### Health Checks

All services provide health check endpoints:
- NestJS: `GET /health`
- Python: `GET /health`
- Go: `GET /health`
- LangChain: Built into Next.js

## 📚 API Documentation

### NestJS API

- **Swagger UI**: http://localhost:3000/api
- **OpenAPI Spec**: http://localhost:3000/api-json

### Python Service

- **FastAPI Docs**: http://localhost:8001/docs
- **ReDoc**: http://localhost:8001/redoc

### Go Service

- **API Endpoints**: http://localhost:8080/api/v1/
- **Health Check**: http://localhost:8080/health

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation

3. **Run tests and linting**
   ```bash
   pnpm test
   pnpm lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build process or auxiliary tool changes

### Code Review Process

1. All changes require a pull request
2. At least one approval required
3. All tests must pass
4. Code coverage should not decrease
5. Documentation must be updated

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

1. Check the [Issues](../../issues) page
2. Read the [FAQ](FAQ.md)
3. Contact the development team

---

**Happy coding! 🚀** 