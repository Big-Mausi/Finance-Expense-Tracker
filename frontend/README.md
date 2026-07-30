# Expense Tracker

A full-stack Expense Tracker application built with React, TypeScript, Express, Prisma, PostgreSQL, and Docker.

## Features

- Add new expenses
- View all expenses
- Edit existing expenses
- Delete expenses
- View total expenses
- PostgreSQL database with Prisma ORM
- Dockerized frontend, backend, and database

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM

### Database

- PostgreSQL

### DevOps

- Docker
- Docker Compose

---

## Project Structure

```
expense-tracker/
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml
```

---

## Getting Started

### Prerequisites

- Docker Desktop
- Git

---

## Run with Docker

Clone the repository:

```bash
git clone <repository-url>
cd expense-tracker
```

Build and start the application:

```bash
docker compose up --build
```

The application will be available at:

Frontend

```
http://localhost:5173
```

Backend API

```
http://localhost:4005
```

---

## Stop the application

```bash
docker compose down
```

---

## API Endpoints

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /expenses     | Get all expenses |
| POST   | /expenses     | Create expense   |
| PUT    | /expenses/:id | Update expense   |
| DELETE | /expenses/:id | Delete expense   |

---

## Future Improvements

- User Authentication
- Expense Categories Dashboard
- Monthly Reports
- Charts and Analytics
- Expense Search
- Expense Filtering
- Pagination
- Export to CSV/PDF

---

## Author

Yusuf Habeebat
