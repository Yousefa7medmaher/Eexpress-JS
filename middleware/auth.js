import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendResponse } from '../utils/helpers.js';

dotenv.config();

/**
 * Middleware to authenticate the JWT token.
 * Ensures that only requests with a valid token can proceed.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const authenticateToken = (req, res, next) => {
    // Extract the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If token is missing, deny access
    if (!token) {
        return sendResponse(res, 401, false, "Access Denied. No token provided.");
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to the request object
        next(); // Proceed to the next middleware
    } catch (err) {
        return sendResponse(res, 403, false, "Invalid or expired token.");
    }
};

/**
 * Middleware to authorize users based on their role.
 * Ensures that only users with the required role can access certain routes.
 * 
 * @param {string} role - The required user role to access the resource
 * @returns {Function} Express middleware function
 */
export const authorizeRole = (role) => {
    return (req, res, next) => {
        // Check if the user exists and has the required role
        if (!req.user || req.user.role !== role) {
            return sendResponse(res, 403, false, "Access Denied. You do not have permission.");
        }
        next(); // Proceed to the next middleware
    };
};
