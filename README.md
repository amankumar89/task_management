# Task Management App

A lightweight, production-ready Task (Todo) management application built with the MERN-style stack (Node.js + Express + MongoDB for backend, React + Vite + TypeScript + Ant Design for frontend).

[Live Demo](https://todo-app-r2fc.onrender.com) ✅

---

## Table of Contents
1. [About](#about)
2. [Demo](#demo)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [API Endpoints](#api-endpoints)
6. [Environment Variables](#environment-variables)
7. [Local Setup & Development](#local-setup--development)
8. [Production Build](#production-build)
9. [Troubleshooting / Notes](#troubleshooting--notes)
10. [Contributing](#contributing)
11. [License & Author](#license--author)

---

## About
This repository contains a simple task management application with a clean UI for creating, updating, deleting, and filtering tasks. It exposes a small REST API and a modern SPA frontend.

---

## Demo
Open the app (hosted on Render): https://todo-app-r2fc.onrender.com

---

## Features
- Add new tasks with title, description, date, category
- Update task details and status (Complete / Incomplete)
- Delete tasks
- Search tasks by title; filter by category and status
- Server-side pagination

---

## Tech Stack
- Backend: Node.js, Express, MongoDB (via Mongoose)
- Frontend: React (TypeScript) + Vite + Ant Design + Tailwind
- Dev tooling: nodemon, eslint, Vite

---

## API Endpoints
Base URL (development): http://localhost:{PORT}
> Note: PORT is controlled by the backend's `PORT` env variable (defaults to 5002 in code).

Resource: /api/v1/todo

- GET /api/v1/todo
  - Query parameters: page, perPage, title, category, status
  - Searches title using case-insensitive partial matching; returns an object with `rows` and `meta` (pagination)

- POST /api/v1/todo
  - Body: { title, description, date, category, isCompleted }
  - Response: created todo with `id` and details

- PUT /api/v1/todo/:id
  - Body: fields to update (title, description, date, category, isCompleted)

- DELETE /api/v1/todo/:id
  - Deletes the specified todo

Examples (curl):

```bash
# Create
curl -X POST http://localhost:5002/api/v1/todo \
  -H 'Content-Type: application/json' \
  -d '{"title":"Learn Vite","description":"Read docs","date":"2025-12-12"}'

# List
curl 'http://localhost:5002/api/v1/todo?page=1&perPage=10'

# Update
curl -X PUT http://localhost:5002/api/v1/todo/1 \
  -H 'Content-Type: application/json' \
  -d '{"title":"Learn Vite Updated","isCompleted":true}'

# Delete
curl -X DELETE http://localhost:5002/api/v1/todo/1
```

---

## Environment Variables
Create a `.env` file at the project root and set the following values (example provided here):

```env
PORT=5002
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.../todos?retryWrites=true&w=majority
```

Note: The repository includes a `.env` file with a connection string — ensure you use your own credentials for security.

---

## Local Setup & Development
Prerequisites:
- Node.js >= 16
- npm >= 8
- MongoDB (Atlas or local)

How to run locally (recommended):

1. Clone repo
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies (root and frontend):

```bash
npm install
npm install --prefix frontend
```

3. Configure environment variables
```bash
# copy .env.example (if you have one) or create a file named .env at project root
```

4. Start the backend server
```bash
# Start backend (production mode):
npm start

# For development with hot reload (recommended):
npx nodemon backend/index.js
```

5. Start the frontend dev server (in a separate terminal):
```bash
cd frontend
npm run dev
```

6. Open the UI
- Vite dev server: http://localhost:5173 (default)
- Backend server: http://localhost:5002 (default)

Note on proxying requests during development: Vite's dev server proxies `/api` to a backend host — see `frontend/vite.config.ts`. The default proxy target is `http://localhost:5001` in the config, so either update that value or start the backend on the matching port (5001) to avoid CORS/connection issues.

---

## Production Build
To build and serve the application in production:

```bash
# Build frontend inside the root project
npm run build

# Start backend server which serves the built assets (express static)
npm start
```

Visit your server's host / IP in browser (e.g., http://localhost:5002 when running locally) after starting the server.

---

## Troubleshooting / Notes
- If the frontend cannot connect to the API in dev mode, either adjust `frontend/vite.config.ts` proxy target to match the backend port or start backend with `PORT=5001`.
- Root `dev` script in `package.json` uses `nodemon index.js` which targets a root `index.js` not present; recommended to use `npx nodemon backend/index.js` or update `package.json` to point to `backend/index.js`.
- This repo stores a `MONGO_URI` in `.env` — if this is not intended, rotate your credentials.

---

## Contributing
- Feel free to open issues and PRs. For changes to scripts or server port numbers, give reasoning and update README accordingly.

---

## License & Author
- Author: Aman Kumar
- License: MIT (or ISC if you prefer — the project `package.json` uses ISC)

---

If you'd like, I can also:
- Add CI / GitHub Actions for tests & deployment ✅
- Add more visual documentation (screenshots / demo GIF) ✅
- Fix the root `dev` script in `package.json` to improve developer experience ✅

Happy hacking! 💡
# Task Management App

A Todo application built with the MERN stack (MongoDB, Express, React, Node.js) and deployed on Vercel. This app allows users to manage their tasks efficiently with a user-friendly interface.
- [OnRender Server 1](https://todo-app-r2fc.onrender.com)
## Features

- **RESTful APIs**:
  - Create, update, and delete tasks
  - Toggle task status (completed or not)
  - Retrieve all tasks by title, category, or status

- **Client-side functionality**:
  - Add new tasks
  - Update existing tasks
  - Delete tasks
  - Mark tasks as completed or not
  - Search tasks by title
  - filter tasks by category, status 

## Technologies Used

- **Frontend**: 
  - Vite
  - React

- **Backend**:
  - Node.js
  - Express
  - MongoDB

- **Deployment**:
  - OnRender

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   need 2 terminals
   in first terminal use 'npm run dev'
   in second terminal use 'npm run dev'
