# FinInsight Monorepo

A comprehensive monorepo containing multiple services and applications for financial insights and analysis.

## 🏗️ Architecture

This monorepo contains the following services:

- **`services/nestjs-api`** - NestJS REST API service
- **`services/python-service`** - Python microservice
- **`services/golang-service`** - Go microservice  
- **`apps/langchain-app`** - LangChain application
- **`shared`** - Shared utilities and types
- **`docs`** - Documentation
- **`scripts`** - Build and deployment scripts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.9+
- Go 1.21+
- Docker & Docker Compose
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies for all services
pnpm install

# Install Python dependencies
cd services/python-service
pip install -r requirements.txt

# Install Go dependencies
cd services/golang-service
go mod tidy
```

### Development

```bash
# Start all services in development mode
pnpm dev

# Start individual services
pnpm dev:nestjs
pnpm dev:python
pnpm dev:golang
pnpm dev:langchain
```

### Docker

```bash
# Build and run all services
docker-compose up --build

# Run individual services
docker-compose up nestjs-api
docker-compose up python-service
docker-compose up golang-service
```

## 📁 Project Structure

```
fininsight/
├── apps/
│   └── langchain-app/          # LangChain application
├── services/
│   ├── nestjs-api/            # NestJS REST API
│   ├── python-service/        # Python microservice
│   └── golang-service/        # Go microservice
├── shared/                    # Shared utilities
├── docs/                      # Documentation
├── scripts/                   # Build/deployment scripts
├── docker-compose.yml         # Docker orchestration
├── package.json               # Root package.json
└── README.md                  # This file
```

## 🔧 Development Tools

- **Linting**: ESLint, Prettier, Black, golangci-lint
- **Testing**: Jest, Pytest, Go testing
- **Type Checking**: TypeScript, mypy
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana

## 📚 Documentation

See the `docs/` directory for detailed documentation for each service.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

MIT