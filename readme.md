# Basic E-commerce Backend (Node.js/Express.js)

## Project Overview
A robust backend API for an e-commerce platform built with Node.js, Express.js, and MySQL. This backend provides essential e-commerce functionalities with a clean, organized architecture.

## Core Features
- **Secure Authentication**: JWT-based authentication with role-based access control
- **User Management**: Registration and login functionality
- **Product Management**: Complete CRUD operations
- **Order Processing**: Create and track orders
- **Cart Functionality**: Add, view, update, and remove items
- **Payment Integration**: Secure payment processing via Stripe
- **Role-Based Access**: Admin and customer permission levels

## Technology Stack
- **Backend**: Node.js with Express.js framework
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Processing**: Stripe API
- **API Style**: RESTful architecture

## Project Architecture
```
📂 ecommerce_backend
 ├── 📂 controller         # Request handlers for API endpoints
 ├── 📂 controllers        # Additional controllers
 ├── 📂 middleware         # Auth and validation middleware
 ├── 📂 Module             # Core modules
 ├── 📂 node_modules       # Dependencies
 ├── 📂 Router             # API routes definition
 ├── 📂 utils              # Utility functions
 ├── 📂 view               # View templates
 ├── 📄 .env               # Environment variables
 ├── 📄 .gitignore         # Git ignore rules
 ├── 📄 database.sql       # Database schema
 ├── 📄 package-lock.json  # Dependency lock file
 ├── 📄 package.json       # Project dependencies and scripts
 ├── 📄 readme.md          # Project documentation
 ├── 📄 server.js          # Main application entry point
```

## Database Schema
To set up the database, run the provided SQL script:
- [Download database.sql](file:///D:/Projects/ecommerce/database.sql)

## API Documentation

### Authentication Endpoints

#### Register a New User
- **Endpoint**: `POST /register`
- **Test URL**: http://localhost:3000/test/register
- **Description**: Creates a new user account
- **Request Body**:
  ```json
  {
    "username": "JohnDoe",
    "email": "johndoe@example.com",
    "phone": "1234567890",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "token": "<JWT_TOKEN>"
  }
  ```

#### User Login
- **Endpoint**: `POST /login`
- **Test URL**: http://localhost:3000/test/login
- **Description**: Authenticates a user and returns a JWT token
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "token": "<JWT_TOKEN>"
  }
  ```

### Product Management Endpoints

#### Get All Products
- **Endpoint**: `GET /products`
- **Test URL**: http://localhost:3000/test/products
- **Description**: Retrieves all products
- **Authentication**: None required

#### Get a Specific Product
- **Endpoint**: `GET /products/:id`
- **Description**: Retrieves a single product by ID
- **Authentication**: None required

#### Add a Product
- **Endpoint**: `POST /products`
- **Description**: Creates a new product
- **Authentication**: Required (Admin only)
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Update a Product
- **Endpoint**: `PUT /products/:id`
- **Description**: Updates an existing product
- **Authentication**: Required (Admin only)
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Delete a Product
- **Endpoint**: `DELETE /products/:id`
- **Description**: Removes a product
- **Authentication**: Required (Admin only)
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

### Order Management Endpoints

#### Create an Order
- **Endpoint**: `POST /orders`
- **Description**: Places a new order
- **Authentication**: Required
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Get All Orders
- **Endpoint**: `GET /orders`
- **Description**: Retrieves all orders (Admin only)
- **Authentication**: Required (Admin only)
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Get Specific Order
- **Endpoint**: `GET /orders/:id`
- **Description**: Retrieves a specific order
- **Authentication**: Required
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Update Order Status
- **Endpoint**: `PUT /orders/:id/status`
- **Description**: Updates the status of an order
- **Authentication**: Required (Admin only)
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

### Cart Management Endpoints

#### Add Item to Cart
- **Endpoint**: `POST /cart`
- **Description**: Adds an item to user's cart
- **Authentication**: Required
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Get Cart Items
- **Endpoint**: `GET /cart/:user_id`
- **Description**: Retrieves all items in user's cart
- **Authentication**: Required
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Remove an Item from Cart
- **Endpoint**: `DELETE /cart/:user_id/:product_id`
- **Description**: Removes a specific item from cart
- **Authentication**: Required
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Clear Cart
- **Endpoint**: `DELETE /cart/:user_id`
- **Description**: Removes all items from user's cart
- **Authentication**: Required
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

### Payment Processing Endpoint

#### Create Payment
- **Endpoint**: `POST /payment`
- **Test URL**: http://localhost:3000/test/payment
- **Description**: Processes payment for order
- **Request Body**:
  ```json
  {
    "cartItems": [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 3,
        "quantity": 1
      }
    ],
    "totalPrice": 150.00,
    "paymentMethodId": "<STRIPE_PAYMENT_METHOD_ID>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Payment successful",
    "paymentIntent": {
      "id": "pi_12345",
      "status": "succeeded"
    }
  }
  ```

## Installation & Setup

1. **Clone the repository**
   ```
   git clone https://github.com/Yousefa7medmaher/basic_ecommerce_backend.git
   ```

2. **Install dependencies**
   ```
   cd basic_ecommerce_backend
   npm install
   ```

3. **Set up environment variables**
   ```
   cp .env.example .env
   ```
   Edit the `.env` file to include your:
   - Database credentials
   - JWT secret key
   - Stripe API keys
   - Other configuration settings

4. **Start the server**
   ```
   npm start
   ```
   The API will be running at http://localhost:3000

## Security Considerations
- JWT tokens secure API endpoints
- Role-based access prevents unauthorized operations
- Passwords are encrypted before storage
- Input validation on all endpoints

## Testing
Each API endpoint has a test URL provided for easy testing using tools like Postman or cURL.

## Author
Yousef Ahmed Maher
