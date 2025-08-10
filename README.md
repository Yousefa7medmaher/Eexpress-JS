# Express + TypeScript + MongoDB CRUD API

This is a simple CRUD API for managing users, built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**.

---

## Features

- Connects to MongoDB Atlas using a connection string from `.env`
- Defines a User model with fields: `name`, `email`, and optional `age`
- Provides RESTful endpoints to:
  - Get all users (`GET /users`)
  - Get a user by ID (`GET /users/:id`)
  - Create a new user (`POST /users`)
  - Update a user by ID (`PUT /users/:id`)
  - Delete a user by ID (`DELETE /users/:id`)
