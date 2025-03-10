import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        req.user = decoded;  
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};


export const authorizeRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Access Denied. You do not have permission."
            });
        }
        next(); 
    };
};
