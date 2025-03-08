# MVC To-Do App

## Overview
This project is a **To-Do List Application** built using the **MVC (Model-View-Controller) architecture**. The app allows users to manage their tasks efficiently, including adding, updating, retrieving, and marking tasks as completed.

## Features
- Add new tasks with a title and description.
- Update existing tasks.
- Retrieve a specific task by ID.
- Get all tasks stored in the database.
- Mark tasks as completed.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM/Query Execution**: MySQL2
- **Architecture**: MVC (Model-View-Controller)

## Database Schema
```sql
CREATE DATABASE TODOLIST;
USE TODOLIST;

CREATE TABLE TASKS (
    ID INT AUTO_INCREMENT PRIMARY KEY,  -- Task ID (Auto-incremented)
    TITLE VARCHAR(255) NOT NULL,        -- Task title
    DESCRIPTION TEXT,                    -- Detailed task description (Optional)
    STATUS ENUM('pending', 'completed') DEFAULT 'pending',  -- Task status
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Creation timestamp
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- Last update timestamp
);
```

## API Endpoints

### 1. Add a Task
**Endpoint:** `POST /tasks/add`

#### Request Body
```json
{
    "Title": "Task Title",
    "Description": "Task Description"
}
```

#### Response
```json
{
    "success": true,
    "message": "Task added successfully",
    "taskId": 1
}
```

### 2. Update a Task
**Endpoint:** `PUT /tasks/update`

#### Request Body
```json
{
    "id": 1,
    "Title": "Updated Task Title",
    "Description": "Updated Task Description"
}
```

#### Response
```json
{
    "success": true,
    "message": "Task updated successfully"
}
```

### 3. Get Task by ID
**Endpoint:** `GET /tasks/:id`

#### Response
```json
{
    "success": true,
    "message": "Task retrieved successfully",
    "task": {
        "ID": 1,
        "Title": "Task Title",
        "Description": "Task Description",
        "Status": "pending",
        "Created_At": "2024-03-08 12:00:00",
        "Updated_At": "2024-03-08 12:00:00"
    }
}
```

### 4. Get All Tasks
**Endpoint:** `GET /tasks`

#### Response
```json
{
    "success": true,
    "message": "Tasks retrieved successfully",
    "tasks": [
        {
            "ID": 1,
            "Title": "Task Title",
            "Description": "Task Description",
            "Status": "pending",
            "Created_At": "2024-03-08 12:00:00",
            "Updated_At": "2024-03-08 12:00:00"
        }
    ]
}
```

### 5. Mark Task as Completed
**Endpoint:** `PUT /tasks/complete`

#### Request Body
```json
{
    "id": 1
}
```

#### Response
```json
{
    "success": true,
    "message": "Task marked as completed"
}
```

## Installation and Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/Yousefa7medmaher/mvc-todoapp.git
   cd mvc-todoapp
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Configure the Database**
   - Make sure you have MySQL installed.
   - Create the database using the schema provided above.

4. **Run the Application**
   ```sh
   npm start
   ```

5. **Test API Endpoints**
   - Use Postman or a similar tool to send requests to the API.

## Future Enhancements
- User authentication & authorization.
- Task categorization and prioritization.
- Notifications and reminders for tasks.
- Frontend interface using React or Vue.js.

## Contributing
Feel free to fork this repository and submit pull requests. Any contributions are appreciated!

## Contact
- **GitHub:** [Yousefa7medmaher](https://github.com/Yousefa7medmaher)
- **Email:** ya1770620@gmail.com

