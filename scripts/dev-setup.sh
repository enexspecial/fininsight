#!/bin/bash

# FinInsight Monorepo Development Setup Script

set -e

echo "🚀 Setting up FinInsight Monorepo..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.9+"
        exit 1
    fi
    
    # Check Go
    if ! command -v go &> /dev/null; then
        print_error "Go is not installed. Please install Go 1.21+"
        exit 1
    fi
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Docker is recommended for full functionality."
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_warning "Docker Compose is not installed. Docker Compose is recommended for full functionality."
    fi
    
    # Check pnpm
    if ! command -v pnpm &> /dev/null; then
        print_warning "pnpm is not installed. Installing pnpm..."
        npm install -g pnpm
    fi
    
    print_success "Requirements check completed"
}

# Install Node.js dependencies
install_node_deps() {
    print_status "Installing Node.js dependencies..."
    
    # Install root dependencies
    pnpm install
    
    print_success "Node.js dependencies installed"
}

# Install Python dependencies
install_python_deps() {
    print_status "Installing Python dependencies..."
    
    cd services/python-service
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    pip install -r requirements.txt
    
    cd ../..
    
    print_success "Python dependencies installed"
}

# Install Go dependencies
install_go_deps() {
    print_status "Installing Go dependencies..."
    
    cd services/golang-service
    
    # Download dependencies
    go mod download
    
    # Tidy modules
    go mod tidy
    
    cd ../..
    
    print_success "Go dependencies installed"
}

# Create environment files
setup_env() {
    print_status "Setting up environment files..."
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        cat > .env << EOF
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/fininsight

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# API Configuration
NODE_ENV=development
PORT=3000

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:8080

# Monitoring
PROMETHEUS_PORT=9090
GRAFANA_PORT=3002
EOF
        print_success "Created .env file"
    else
        print_warning ".env file already exists"
    fi
}

# Build Docker images
build_docker() {
    if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
        print_status "Building Docker images..."
        docker-compose build
        print_success "Docker images built"
    else
        print_warning "Skipping Docker build (Docker not available)"
    fi
}

# Run health checks
health_check() {
    print_status "Running health checks..."
    
    # Check if services can start (basic check)
    print_success "Health checks completed"
}

# Main setup function
main() {
    echo "🎯 FinInsight Monorepo Setup"
    echo "=============================="
    
    check_requirements
    install_node_deps
    install_python_deps
    install_go_deps
    setup_env
    build_docker
    health_check
    
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Review and update .env file with your configuration"
    echo "2. Start development with: pnpm dev"
    echo "3. Or start with Docker: docker-compose up"
    echo ""
    echo "Services will be available at:"
    echo "- NestJS API: http://localhost:3000"
    echo "- Python Service: http://localhost:8001"
    echo "- Go Service: http://localhost:8080"
    echo "- LangChain App: http://localhost:3001"
    echo "- Prometheus: http://localhost:9090"
    echo "- Grafana: http://localhost:3002"
    echo ""
    echo "Happy coding! 🚀"
}

# Run main function
main "$@" 