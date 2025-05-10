import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import route from './Router/routes.js';

const app = express();
dotenv.config();

// Manually handle CORS by allowing all origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (or set specific origin like 'http://localhost:3001')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use('/test', route);

app.listen(PORT, () => {
    console.log(`App listen in port ${PORT}`.bgBlack.gray);
});