/**
 * Validation utility functions for user registration
 * @module utils/validation
 */

/**
 * Validates an email address format
 * Checks for standard email pattern with @ and domain
 * @param {string} email - The email address to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    
    // RFC 5322 compliant email regex pattern
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email.trim());
  };
  
  /**
   * Validates password strength
   * Ensures password meets minimum security requirements
   * @param {string} password - The password to validate
   * @param {Object} options - Optional password requirements
   * @param {number} options.minLength - Minimum password length (default: 8)
   * @param {boolean} options.requireUppercase - Require uppercase letter (default: true)
   * @param {boolean} options.requireLowercase - Require lowercase letter (default: true)
   * @param {boolean} options.requireNumbers - Require at least one number (default: true)
   * @param {boolean} options.requireSpecial - Require special character (default: false)
   * @returns {boolean} True if valid, false otherwise
   */
  export const validatePassword = (password, options = {}) => {
    if (!password || typeof password !== 'string') return false;
    
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecial = false
    } = options;
    
    // Check minimum length
    if (password.length < minLength) return false;
    
    // Check for required character types
    if (requireUppercase && !/[A-Z]/.test(password)) return false;
    if (requireLowercase && !/[a-z]/.test(password)) return false;
    if (requireNumbers && !/[0-9]/.test(password)) return false;
    if (requireSpecial && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;
    
    return true;
  };
  
  /**
   * Validates phone number format
   * Supports international phone formats
   * @param {string} phone - The phone number to validate
   * @param {Object} options - Optional validation options
   * @param {boolean} options.allowInternational - Allow international formats (default: true)
   * @param {string} options.defaultCountryCode - Default country code to assume (default: '')
   * @returns {boolean} True if valid, false otherwise
   */
  export const validatePhone = (phone, options = {}) => {
    if (!phone || typeof phone !== 'string') return false;
    
    const {
      allowInternational = true,
      defaultCountryCode = ''
    } = options;
    
    const phoneClean = phone.trim().replace(/\s+/g, '');
    
    // Basic validation for international format (E.164 standard)
    if (allowInternational) {
      // Allow + prefix and 7-15 digits
      const internationalPattern = /^\+?[0-9]{7,15}$/;
      return internationalPattern.test(phoneClean);
    }
    
    // Stricter validation for specific country formats
    // This is a basic example - expand based on your requirements
    const basicPhonePattern = /^[0-9]{7,15}$/;
    return basicPhonePattern.test(phoneClean);
  };