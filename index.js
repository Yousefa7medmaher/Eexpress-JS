const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const db = require('./config/db');
 
const app = express();
dotenv.config();
app.use(express.json());

const api = process.env.API || '/api';
const Port = process.env.PORT || 4000;

 

// Create a new user
app.post(`${api}/users`, (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(query, [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "User created successfully",
            user_id: result.insertId
        });
    });
});

// Create a new order
app.post(`${api}/orders`, (req, res) => {
    const { user_id, total_price } = req.body;

    if (!user_id || !total_price) {
        return res.status(400).json({ error: "User ID and total price are required" });
    }

    const query = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
    db.query(query, [user_id, total_price], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Order added successfully",
            order_id: result.insertId
        });
    });
});

// Fetch all orders for a specific user
app.get(`${api}/users/:user_id/orders`, (req, res) => {
    const { user_id } = req.params;

    const query = `
        SELECT users.user_id, users.name, users.email, orders.order_id, orders.total_price, orders.order_date
        FROM users
        LEFT JOIN orders ON users.user_id = orders.user_id
        WHERE users.user_id = ?`;

    db.query(query, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({
            user: {
                user_id: result[0].user_id,
                name: result[0].name,
                email: result[0].email,
            },
            orders: result.map(order => ({
                order_id: order.order_id,
                total_price: order.total_price,
                order_date: order.order_date
            })).filter(order => order.order_id !== null)
        });
    });
});

// Start the server
app.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`.bgGreen.white);
});