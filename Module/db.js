import mysql2 from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let db;

function databaseConnection() {
    try {
        db = mysql2.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '1234',
            database: process.env.DB_NAME || 'e_commerce1',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process if the database fails to connect
    }
}

// Initialize connection
databaseConnection();

export default db.promise(); // Export with promise support