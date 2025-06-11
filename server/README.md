# Farm App Backend

This is a Node.js + Express backend for the Farm App, using MongoDB, JWT-based stateless authentication, and bcrypt for password hashing.

## Features

- User registration & login (JWT auth)
- Task CRUD endpoints
- MongoDB with Mongoose
- Stateless REST API

## Setup

1. Copy `.env` and set your MongoDB URI and JWT secret.
2. Run `npm install` to install dependencies.
3. Start the server: `node index.js` or `npm start` (after adding a start script).

## Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get JWT
- `GET /api/tasks` — Get all tasks (auth required)
- `POST /api/tasks` — Create a new task (auth required)
- ... (see code for more)
