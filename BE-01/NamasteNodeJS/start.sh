#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to cleanup background processes on exit
cleanup() {
    print_warning "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    wait $BACKEND_PID $FRONTEND_PID 2>/dev/null
    print_success "Servers stopped"
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    print_error "Bun is not installed. Please install Bun first."
    exit 1
fi

print_success "Bun found: $(bun --version)"

# Check if .env files exist
if [ ! -f "devTinder-api/.env" ]; then
    print_warning "Backend .env file not found. Please create devTinder-api/.env"
fi

if [ ! -f "devTinder-web/.env" ]; then
    print_warning "Frontend .env file not found. Please create devTinder-web/.env"
fi

# Start backend server
print_info "Starting backend server..."
cd devTinder-api
bun run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to initialize
sleep 2

# Check if backend started successfully
if ps -p $BACKEND_PID > /dev/null; then
    print_success "Backend server started (PID: $BACKEND_PID)"
else
    print_error "Failed to start backend server"
    exit 1
fi

# Start frontend server
print_info "Starting frontend server..."
cd devTinder-web
bun run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to initialize
sleep 2

# Check if frontend started successfully
if ps -p $FRONTEND_PID > /dev/null; then
    print_success "Frontend server started (PID: $FRONTEND_PID)"
else
    print_error "Failed to start frontend server"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

print_success "Both servers are running!"
echo ""
print_info "Backend:  http://localhost:5000"
print_info "Frontend: http://localhost:5173"
echo ""
print_info "Logs are being written to backend.log and frontend.log"
print_warning "Press Ctrl+C to stop both servers"
echo ""

# Tail both log files
tail -f backend.log frontend.log
