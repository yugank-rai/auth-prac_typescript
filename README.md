# Auth App

A full-stack authentication application built with React, TypeScript, Express, MongoDB, and JWT. The app includes user registration, login, protected dashboard/profile routes, and token-based authentication.

## Features

- User registration with validation
- User login with JWT authentication
- Protected profile and dashboard endpoints
- React router-based auth screens
- Password hashing with bcrypt
- MongoDB persistence for users

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Axios
- Zod

### Backend
- Node.js
- Express 5
- TypeScript
- MongoDB with Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Zod

## Project Structure

```text
auth-app/          # React + Vite frontend
  src/
    components/     # Login, Register, Dashboard views
    context/        # Auth context
    services/       # API client
    validators/     # Form validation

auth-backend/      # Express + TypeScript backend
  src/
    config/         # Database connection
    middleware/     # Auth and error handling
    models/         # User model
    routes/         # Auth and protected routes
    validators/     # Request validation
```

## Prerequisites

- Node.js 18+ recommended
- npm or pnpm
- MongoDB instance (local or cloud)

## Environment Variables

Create a .env file inside the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth-app
JWT_SECRET=your-secret-key
```

## Installation

1. Install frontend dependencies:

```bash
cd auth-app
npm install
```

2. Install backend dependencies:

```bash
cd ../auth-backend
npm install
```

## Running the Project

### Start the backend

```bash
cd auth-backend
npm run dev
```

The API will run on http://localhost:5000.

### Start the frontend

```bash
cd auth-app
npm run dev
```

The frontend will run on http://localhost:5173.

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Protected Routes
- GET /api/protected/profile
- GET /api/protected/dashboard

## License

This project is for learning and demonstration purposes.
