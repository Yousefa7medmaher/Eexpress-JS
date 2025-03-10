import db from '../Module/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Login 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with success/error message
 */

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const UserExistQuery = 'SELECT * FROM USERS WHERE EMAIL = ?';
        const [__Check] = await db.query(UserExistQuery, [email]);

        // Check if user exists in database 
        if (!__Check || __Check.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const User = __Check[0];

        const validPass = await bcrypt.compare(password, User.password_hash);
        if (!validPass) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // Check if JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Create a JWT TOKEN 
        const Token = jwt.sign(
            { id: User.id, role: User.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Final step send Token for client 
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: Token, // إرسال التوكن إلى العميل
            user: {
                id: User.id,
                email: User.email,
                role: User.role
            }
        });

    } catch (err) {
        next(err);
    }
};
