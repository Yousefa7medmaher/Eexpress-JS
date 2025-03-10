import db from '../Module/db.js' ;
import bcrypt from 'bcryptjs'; 
/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with success/error message
 */

export const registerController = async (req, res, next) => {
    try {
        const { username, email, password, phone } = req.body;

        // Validate required fields
        if (!username || !email || !password || !phone) {
            return res.status(400).json({ 
                success: false, 
                message: "Please enter all required fields." 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format." 
            });
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters long and include at least one letter and one number." 
            });
        }

        // Check if user already exists
        const checkUserQuery = "SELECT id FROM users WHERE email = ? OR username = ? OR phone = ?";
        const [existingUsers] = await db.query(checkUserQuery, [email, username, phone]);
        
        if (existingUsers.length > 0) {
            return res.status(409).json({ 
                success: false, 
                message: "User already exists. Please use another email, username, or phone number." 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into database
        const insertUserQuery = `
            INSERT INTO users (username, email, phone, password_hash ) 
            VALUES (?, ?, ?, ?)
        `;
        
        const [result] = await db.query(insertUserQuery, [
            username, 
            email, 
            phone, 
            hashedPassword
        ]);

        return res.status(201).json({ 
            success: true, 
            message: "User registered successfully!",
            userId: result.insertId
        });
    } catch (err) {
        console.error(`Registration error: ${err.message}`);
        next(err);
    }
};

export default {
    registerController  
};