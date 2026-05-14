# REST API with Express, TypeORM, MongoDB, Clean Architecture, and OOP

This project is organized with a simple clean architecture flow:

`Route -> Controller -> Service -> Repository -> TypeORM/MongoDB`

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Make sure MongoDB is running locally, or update `MONGO_URL` in `.env`.

## Endpoints

Base URL: `http://localhost:3000/api`

```http
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

Health check:

```http
GET /health
```

## User JSON

```json
{
  "name": "Sok Dara",
  "email": "dara@example.com"
}
```
