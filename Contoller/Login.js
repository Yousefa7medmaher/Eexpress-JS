import db from '../Module/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendResponse } from '../utils/helpers.js';

dotenv.config();

/**
 * Login 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with success/error message
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const UserExistQuery = 'SELECT * FROM USERS WHERE EMAIL = ?';
        const [userData] = await db.query(UserExistQuery, [email]);

        if (!userData || userData.length === 0) {
            return sendResponse(res, 404, false, "User not found");
        }

        const user = userData[0];
        const validPass = await bcrypt.compare(password, user.password_hash);

        if (!validPass) {
            return sendResponse(res, 401, false, "Incorrect password");
        }

        if (!process.env.JWT_SECRET) {
            return next(new Error("JWT_SECRET is not defined in environment variables"));
        }

        //Create Token 
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // send response with token 
        return sendResponse(res, 200, true, "Login successful", {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        next(err);
    }
};
