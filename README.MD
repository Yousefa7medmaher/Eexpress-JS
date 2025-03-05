# CRUD API with Express, MVC, and SQL

This project implements a simple CRUD (Create, Read, Update, Delete) API for managing products using **Express.js**, **MySQL**, and the **MVC architecture**.

## Features
- Retrieve all products
- Retrieve a product by ID
- Create a new product
- Update an existing product
- Delete a product

## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**
- **MVC (Model-View-Controller) Architecture**

## Installation
### 1. Clone the repository
```bash
git clone  https://github.com/Yousefa7medmaher/Eexpress-JS/tree/crud 
cd crud
```
### 2. Install dependencies
```bash
npm install
```
### 3. Configure Database
Make sure you have MySQL installed and create a database with the following table:
```sql
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img_source TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
```
### 4. Configure the Database Connection
Edit the `db.js` file in the `Module` directory with your database credentials.
```js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name',
});

module.exports = pool;
```
### 5. Run the Server
```bash
npm start
```

## API Endpoints
### 1. Get All Products
**Endpoint:** `GET /products`
```json
Response:
{
  "success": true,
  "message": "Data sent successfully",
  "data": [
    {
      "name": "Product 1",
      "img_source": "image_url",
      "price": 20.99
    }
  ]
}
```
### 2. Get Product by ID
**Endpoint:** `GET /products/:id`
```json
Response:
{
  "success": true,
  "message": "Data sent successfully",
  "data": {
    "id": 1,
    "name": "Product 1",
    "img_source": "image_url",
    "price": 20.99
  }
}
```
### 3. Create a Product
**Endpoint:** `POST /products`
**Body:**
```json
{
  "name": "New Product",
  "img_source": "image_url",
  "price": 25.50
}
```
**Response:**
```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "id": 5,
    "name": "New Product",
    "img_source": "image_url",
    "price": 25.50
  }
}
```
### 4. Update a Product
**Endpoint:** `PUT /products`
**Body:**
```json
{
  "id": 1,
  "name": "Updated Product",
  "img_source": "updated_image_url",
  "price": 30.99
}
```
**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Product",
    "img_source": "updated_image_url",
    "price": 30.99
  }
}
```
### 5. Delete a Product
**Endpoint:** `DELETE /products/:id`
```json
Response:
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Project Structure
```
project-folder/
│── controllers/
│   ├── productController.js   # Handles request logic
│── models/
│   ├── db.js                  # Database connection
│── routes/
│   ├── productRoutes.js       # Defines API routes
│── server.js                   # Entry point
│── package.json                # Dependencies
```

## License
This project is open-source and available for modification.

---

Happy coding! 🚀

