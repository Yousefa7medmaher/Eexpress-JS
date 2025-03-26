# Basic E-commerce Backend (Node.js)

## Description
This is a **backend API** for a basic e-commerce platform built using **Node.js**, **Express.js**, and **MySQL**. It provides essential functionalities such as **user authentication (JWT-based)**, **product management**, **order processing**, and **cart handling**.

## Features
- **JWT Authentication & Authorization** (with roles: `admin` & `customer`)
- **User Registration & Login**
- **Product Management (CRUD) [Admin Only]**
- **Order Management**
- **Cart Management**
- **Middleware-based Authentication**
- **Helper Functions for Request Handling**
- **Database Queries Separated for Clean Code Structure**
- **MySQL Database Integration**

---
## Database Schema (MySQL)
Run the following SQL script to set up the database:

```sql
-- Create the database
CREATE DATABASE e_commerce1;
USE e_commerce1;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Activity Table
CREATE TABLE user_activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action_type VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    category_id INT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    status ENUM('pending', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---
## API Documentation

### **Authentication & Authorization**

#### **User Registration**
- **Endpoint:** `POST /register`
- **Request Type:** `POST`
- **Request Body:**
  ```json
  {
    "username": "JohnDoe",
    "email": "johndoe@example.com",
    "phone": "1234567890",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "token": "<JWT_TOKEN>"
  }
  ```

#### **User Login**
- **Endpoint:** `POST /login`
- **Request Type:** `POST`
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "<JWT_TOKEN>"
  }
  ```

### **Product Management (Admin Only)**

#### **Get All Products**
- **Endpoint:** `GET /products`
- **Request Type:** `GET`

#### **Get a Specific Product**
- **Endpoint:** `GET /products/:id`
- **Request Type:** `GET`

#### **Add a Product**
- **Endpoint:** `POST /products`
- **Request Type:** `POST`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Admin Only)

#### **Update a Product**
- **Endpoint:** `PUT /products/:id`
- **Request Type:** `PUT`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Admin Only)

#### **Delete a Product**
- **Endpoint:** `DELETE /products/:id`
- **Request Type:** `DELETE`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Admin Only)

### **Order Management**

#### **Create an Order**
- **Endpoint:** `POST /orders`
- **Request Type:** `POST`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`

#### **Get All Orders (Admin Only)**
- **Endpoint:** `GET /orders`
- **Request Type:** `GET`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Admin Only)

#### **Get Specific Order**
- **Endpoint:** `GET /orders/:id`
- **Request Type:** `GET`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`

#### **Update Order Status (Admin Only)**
- **Endpoint:** `PUT /orders/:id/status`
- **Request Type:** `PUT`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Admin Only)

### **Cart Management**

#### **Add Item to Cart**
- **Endpoint:** `POST /cart`
- **Request Type:** `POST`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`

#### **Get Cart Items**
- **Endpoint:** `GET /cart`
- **Request Type:** `GET`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`

#### **Remove an Item from Cart**
- **Endpoint:** `DELETE /cart/:id`
- **Request Type:** `DELETE`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`

#### **Clear Cart**
- **Endpoint:** `DELETE /cart`
- **Request Type:** `DELETE`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`

---
## Project Structure
```
📂 basic_ecommerce_backend
 ├── 📂 Controller
 ├── 📂 Middleware
 ├── 📂 Router
 ├── 📂 Helpers
 ├── .env
 ├── server.js
 ├── package.json
```

---
## Installation & Setup
```bash
# Clone the repository
git clone https://github.com/Yousefa7medmaher/basic_ecommerce_backend.git

# Install dependencies
cd basic_ecommerce_backend
npm install

# Setup environment variables
cp .env.example .env

# Start the server
npm start
```

---
## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**
- **JWT Authentication**
- **REST API**

---
## Author
[Yousef Ahmed Maher](https://github.com/Yousefa7medmaher)

