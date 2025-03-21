export const queries = {
 
    getAllCustomers: 'SELECT * FROM customers',
    getCustomerById: 'SELECT * FROM customers WHERE id = ?',
    insertCustomer: 'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
    deleteCustomer: 'DELETE FROM customers WHERE id = ?;',
    updateCustomer: 'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?;',
 
    validateAlldataofuser: `
        SELECT id, email, username, phone 
        FROM users 
        WHERE email = ? OR username = ? OR phone = ?
    `,

 
    insertdataTouserTable: `
        INSERT INTO users (username, email, phone, password_hash)
        VALUES (?, ?, ?, ?)
    `,

     checkIfuserExitsByemail: `
        SELECT id, email, username, password_hash, role, status, profile_image
        FROM users 
        WHERE email = ?
    `,

     updateLastLogin: `
        UPDATE users 
        SET last_login = ? 
        WHERE id = ?
    `,

     logUserActivity: `
        INSERT INTO user_activity (user_id, activity_type, description, ip_address, user_agent, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    `
};
