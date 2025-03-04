# Express API for Users and Orders

This is a simple REST API built using Express.js that allows users to create accounts, place orders, and fetch their order history.

## Features
- Create a new user
- Create a new order
- Fetch all orders for a specific user

## Technologies Used
- Node.js
- Express.js
- MySQL (via a database connection)
- dotenv for environment variable management
- colors for terminal styling

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd project-directory
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up a `.env` file with the following variables:
   ```env
   API=/api
   PORT=4000
   DB_HOST=<your-database-host>
   DB_USER=<your-database-user>
   DB_PASSWORD=<your-database-password>
   DB_NAME=<your-database-name>
   ```
5. Start the server:
   ```sh
   npm start
   ```

## Database Schema
```sql
CREATE DATABASE EX_DB;
USE EX_DB;
 
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

## API Endpoints

### Create a New User
**Endpoint:** `POST /api/users`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully",
    "user_id": 1
  }
  ```

### Create a New Order
**Endpoint:** `POST /api/orders`
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "total_price": 100.50
  }
  ```
- **Response:**
  ```json
  {
    "message": "Order added successfully",
    "order_id": 1
  }
  ```

### Fetch Orders for a Specific User
**Endpoint:** `GET /api/users/:user_id/orders`
- **Response:**
  ```json
  {
    "user": {
      "user_id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    "orders": [
      {
        "order_id": 1,
        "total_price": 100.50,
        "order_date": "2024-03-04"
      }
    ]
  }
  ```

## Running in Development Mode
Use `nodemon` for hot-reloading during development:
```sh
npm install -g nodemon
nodemon index.js
```

## License
This project is licensed under the MIT License.

