# Task Management App

A minimal Todo application with a Node.js + Express backend (MongoDB/Mongoose) and a React + Vite (TypeScript) frontend.

[Live Demo (Netlify)](https://task-management-app-client.netlify.app)

---

## Table of Contents
- About
- Demo
- Features
- Tech Stack
- Quick Start
- API Endpoints
- Environment Variables
- Production Build
- Troubleshooting
- Contributing
- License & Author

---

## About
This project is a simple task management application (create, update, delete, search, and filter tasks) with a REST API backend and a single-page application frontend.

---

## Demo
Live demo: https://task-management-app-client.netlify.app

---

## Features
- CRUD tasks (Create, Read, Update, Delete)
- Mark tasks complete/incomplete
- Filter and search tasks
- Pagination

---

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React (TypeScript), Vite, Ant Design, Tailwind

---

## Quick Start
1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```
2. Install dependencies:
```bash
npm install
npm install --prefix frontend
```
3. Create a `.env` file (see Environment Variables)
4. Start the backend (development):
```bash
npx nodemon backend/index.js
```
5. Start the frontend (development):
```bash
cd frontend
npm run dev
```

Open: frontend at http://localhost:5173 and backend at http://localhost:5002 (default).

Note: `frontend/vite.config.ts` proxies `/api` to `http://localhost:5001`. Change it to `http://localhost:5002` or run the backend on 5001 during local development.

---

## API Endpoints
Base: `/api/v1/todo`
- GET `/` — list todos (params: page, perPage, title, category, status)
- POST `/` — create todo
- PUT `/:id` — update todo
- DELETE `/:id` — delete todo

---

## Environment Variables
Create `.env` with:
```env
PORT=5002
MONGO_URI=your-mongodb-uri
```

---

## Production Build
```bash
npm run build
npm start
```

---

## Troubleshooting
- If the frontend cannot reach the API in dev mode, update `frontend/vite.config.ts` proxy target or run the backend on the proxy target port.
- Use `npx nodemon backend/index.js` for backend dev server.
- Remove or rotate any sensitive credentials stored in `.env`.

---

## Contributing
Open PRs with a clear description of changes. Small PRs are accepted.

---

## License & Author
- Author: Aman Kumar
- License: ISC

---

Happy hacking! 💡
