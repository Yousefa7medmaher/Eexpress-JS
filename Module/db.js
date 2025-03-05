const mysql2 = require('mysql2');
require('dotenv').config();

 
const db = mysql2.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "CRUD_EXPRESS",
    waitForConnections: true,
    connectionLimit: 10,  
    queueLimit: 0        
}).promise();  

 db.getConnection()
    .then(connection => {
        console.log("✅ DB connection successfully");
        connection.release();
    })
    .catch(err => {
        console.error("❌ Error in DB connection:", err);
    });

module.exports = db;
