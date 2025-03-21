# 🔒 Authentication and Authorization System

## 📌 Overview
This project implements a secure authentication and authorization system using **Node.js**, **Express**, **MySQL**, and **JWT**. It follows best practices to ensure scalability, readability, and reusability by utilizing helper functions and separating concerns into different modules.

## ✨ Features
- ✅ **User Authentication** (Login, Logout, Registration)
- 🔑 **User Authorization** (Role-based access control)
- 🔄 **JWT Token Handling**
- 🔐 **Secure Password Hashing using bcrypt**
- 💂 **CRUD operations for customer management**
- 📂 **Separation of Concerns for Maintainability**

## 💁️ Folder Structure
```
📂 project-folder/
│── 📂 controllers/
│   ├─🔒 auth.js          # Authentication and Authorization logic
│── 📂 middleware/
│   ├─🏁 auth.js          # Authentication middleware (validate token, check roles)
│── 📂 helpers/
│   ├─️⚙️ helper.js        # Reusable helper functions (send responses, error handling)
│── 📂 config/
│   ├─📺 db.js            # Database connection
│── 📂 routes/
│   ├─🛎️ api.js           # Routes for authentication and CRUD operations
│── 📄 .env                 # Environment variables
│── 🚀 server.js            # Main entry point
```

## 🔄 API Endpoints
### 📝 Authentication
- **Register User**  
  `POST http://localhost:3000/test/register`
- **Login User**  
  `POST http://localhost:3000/test/login`

### 📄 Customer Management
- **Get All Customers**  
  `GET http://localhost:3000/test/GetAllCustomers`
- **Get Customer by ID**  
  `GET http://localhost:3000/test/getCustomerById/:id`
- **Add New Customer**  
  `POST http://localhost:3000/test/addCustomer`
- **Update Customer Data**  
  `PUT http://localhost:3000/test/updateCustomerData`
- **Delete Customer**  
  `DELETE http://localhost:3000/test/deleteCustomer/:id`

## 📄 Database Schema (SQL)
### 📂 Table: `users`
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    role ENUM('user','admin') NOT NULL DEFAULT 'user',
    status ENUM('active','inactive','banned') NOT NULL DEFAULT 'active',
    auth_type ENUM('local','google','facebook') NOT NULL DEFAULT 'local',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 📂 Table: `customers`
```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    role ENUM('user','admin') NOT NULL DEFAULT 'user',
    status ENUM('active','inactive','banned') NOT NULL DEFAULT 'active',
    auth_type ENUM('local','google','facebook') NOT NULL DEFAULT 'local',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🎯 Best Practices Used
- ✅ **Separation of Concerns** - Organized structure with different modules.
- ✅ **Security Measures** - Enforced authentication, password hashing, and role-based access control.
- ✅ **Scalability** - Modular design for easy extension.

## 📈 Conclusion
This system ensures **secure authentication, role-based authorization, and customer management** with a **scalable and maintainable** code structure. Feel free to contribute or extend its functionalities! 🚀

