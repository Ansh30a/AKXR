# DevTinder

A full-stack developer networking and connection platform built with modern web technologies. DevTinder enables developers to connect, share profiles, send connection requests, and build their professional network.

## Project Structure

```
DevTinder/
├── devTinder-api/          # Backend API server
└── devTinder-web/          # Frontend React application
```

## Technology Stack

### Backend (devTinder-api)

- **Runtime**: Bun
- **Framework**: Express.js v5.2.1
- **Language**: TypeScript v5+
- **Database**: MongoDB with Mongoose ODM v9.4.1
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Security**: bcrypt v6.0.0 for password hashing
- **Middleware**: 
  - CORS v2.8.6
  - cookie-parser v1.4.7
- **Validation**: validator v13.15.35

### Frontend (devTinder-web)

- **Runtime**: Bun
- **Framework**: React v19.2.5
- **Language**: TypeScript v6.0.2
- **Build Tool**: Vite v8.0.10
- **Routing**: React Router DOM v7.14.2
- **State Management**: Redux Toolkit v2.11.2 with React Redux v9.2.0
- **HTTP Client**: Axios v1.16.0
- **Styling**: 
  - Tailwind CSS v4.2.4
  - DaisyUI v5.5.19
- **Linting**: ESLint v10.2.1 with TypeScript support

## Prerequisites

- Bun (latest version)
- MongoDB (local or cloud instance)
- Node.js v16+ (optional, for compatibility)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Ansh30a/AKXR.git
cd AKXR/BE-01/NamasteNodeJS
```

### 2. Backend Setup

```bash
cd devTinder-api
bun install
```

Create a `.env` file in the `devTinder-api` directory:

```env
MONGODB_URI=mongodb://localhost:27017/DevTinder
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=1d
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../devTinder-web
bun install
```

Create a `.env` file in the `devTinder-web` directory:

```env
VITE_BASE_API_URL=http://localhost:5000
```

## Running the Application

### Option 1: Using the Start Script (Recommended)

From the root directory:

```bash
./start.sh
```

This will start both the backend and frontend servers concurrently.

### Option 2: Manual Start

#### Start Backend

```bash
cd devTinder-api
bun run dev
```

The API server will run on `http://localhost:5000`

#### Start Frontend

```bash
cd devTinder-web
bun run dev
```

The web application will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes

- `POST /sign-up` - Register a new user
- `POST /login` - User login
- `POST /logout` - User logout

### Profile Routes

- `GET /profile` - Get user profile
- `PATCH /profile/edit` - Update user profile

### Connection Request Routes

- `POST /request/send/:status/:toUserId` - Send connection request
- `POST /request/review/:status/:requestId` - Review connection request

### User Routes

- `GET /user/connections` - Get user connections
- `GET /user/requests/received` - Get received connection requests
- `GET /user/feed` - Get user feed

## Database Schema

### User Model

- `firstName` (String, required, min: 4, max: 50)
- `lastName` (String, optional)
- `email` (String, required, unique)
- `password` (String, required, min: 8, hashed)
- `age` (Number, required, min: 16)
- `gender` (String, required, enum)
- `photoUrl` (String, optional)
- `bio` (String, default provided)
- `skills` (Array of Strings, default provided)
- `timestamps` (createdAt, updatedAt)

### Connection Request Model

- `fromUserId` (ObjectId, required, ref: User)
- `toUserId` (ObjectId, required, ref: User)
- `status` (String, required, enum: ['ignored', 'interested', 'rejected', 'accepted'])
- `timestamps` (createdAt, updatedAt)

## Build for Production

### Backend

```bash
cd devTinder-api
bun run build
bun run start
```

### Frontend

```bash
cd devTinder-web
bun run build
bun run preview
```

## Development Scripts

### Backend Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run typecheck` - Run TypeScript type checking

### Frontend Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

## Features

- User authentication with JWT
- Profile management
- Connection requests (send, accept, reject)
- User feed
- Real-time connection status
- Responsive design with Tailwind CSS and DaisyUI
- Type-safe development with TypeScript
- Modern React patterns with hooks and Redux Toolkit

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- CORS configuration
- Input validation
- Protected API routes

## Project Configuration

### TypeScript Configuration

Both frontend and backend use strict TypeScript configuration with:
- ESNext target
- Strict mode enabled
- Module preservation
- Bundler module resolution

### Vite Configuration

- React plugin for JSX support
- Tailwind CSS integration
- DaisyUI component library
- Hot module replacement (HMR)

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | Secret key for JWT signing | - |
| JWT_EXPIRY | JWT token expiration time | 1d |
| FRONTEND_URL | Frontend application URL | http://localhost:5173 |
| PORT | Server port | 5000 |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_BASE_API_URL | Backend API base URL | http://localhost:5000 |

## License

Private

## Version

- Backend: 1.0.0
- Frontend: 0.0.0
