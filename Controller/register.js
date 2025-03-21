import db from '../Module/db.js';
import bcrypt from 'bcryptjs';
import { queries } from '../Module/queries.js';
import { sendResponse } from '../utils/helpers.js';
import { validateEmail, validatePassword, validatePhone } from '../utils/validation.js';

/**
 * User registration controller
 * Handles user registration with input validation and security measures
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response
 */
export const register = async (req, res, next) => {
  try {
    const { 
      username, 
      email, 
      phone, 
      password_hash, 
      profile_image, 
      auth_type = 'local' // Default value
    } = req.body;
    
    // Required field validation
    if (!username?.trim() || !email?.trim() || !phone?.trim() || !password_hash) {
      return sendResponse(res, 400, false, 'Please enter all required fields');
    }
    
    // Input validation
    if (!validateEmail(email)) {
      return sendResponse(res, 400, false, 'Invalid email format');
    }
    
    if (!validatePhone(phone)) {
      return sendResponse(res, 400, false, 'Invalid phone number format');
    }
    
    if (!validatePassword(password_hash)) {
      return sendResponse(res, 400, false, 'Password must be at least 8 characters and include uppercase, lowercase, and numbers');
    }
    
    // Check if user already exists using a transaction
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      
      const [existingUsers] = await connection.query(queries.validateAlldataofuser, [
        email.toLowerCase().trim(),
        username.trim(),
        phone.trim()
      ]);
      
      if (existingUsers.length > 0) {
        await connection.rollback();
        
        // More specific error message about which field is duplicated
        const duplicateUser = existingUsers[0];
        if (duplicateUser.email === email.toLowerCase().trim()) {
          return sendResponse(res, 409, false, 'Email already in use');
        } else if (duplicateUser.username === username.trim()) {
          return sendResponse(res, 409, false, 'Username already in use');
        } else {
          return sendResponse(res, 409, false, 'Phone number already in use');
        }
      }
      
      // Password hashing with stronger work factor
      const SALT_ROUNDS = 12;
      const hashedPassword = await bcrypt.hash(password_hash, SALT_ROUNDS);
      
      // Default values
      const defaultProfileImage = profile_image || 'default.jpg';
      const userRole = 'user';
      const userStatus = 'active';
      const now = new Date();
      
      // Insert user into database
      await connection.query(queries.insertdataTouserTable, [
        username.trim(),
        email.toLowerCase().trim(),
        phone.trim(),
        hashedPassword,
        defaultProfileImage,
        userRole,
        userStatus,
        auth_type,
        now,
        now
      ]);
      
      await connection.commit();
      return sendResponse(res, 201, true, 'User registered successfully');
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Registration error:', err);
    
    // Specific error handling for database errors
    if (err.code === 'ER_DUP_ENTRY') {
      return sendResponse(res, 409, false, 'User already exists');
    }
    
    return next(err);
  }
};