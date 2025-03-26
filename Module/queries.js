export const queries = {
    // User Queries
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
    `,

    // Product Queries
    getAllProducts: `
        SELECT * 
        FROM products
    `,
    getProductById: `
        SELECT * 
        FROM products 
        WHERE id = ?
    `,
    insertProduct: `
        INSERT INTO products (name, description, price, stock) 
        VALUES (?, ?, ?, ?)
    `,
    updateProduct: `
        UPDATE products 
        SET name = ?, description = ?, price = ?, stock = ? 
        WHERE id = ?
    `,
    deleteProduct: `
        DELETE FROM products 
        WHERE id = ?
    `,

    // Order Queries
    insertOrder: `
        INSERT INTO orders (user_id, total_price, status, created_at) 
        VALUES (?, 0, 'pending', NOW())
    `,
    insertOrderItem: `
        INSERT INTO order_items (order_id, product_id, quantity, subtotal) 
        VALUES (?, ?, ?, ?)
    `,
    updateOrderTotalPrice: `
        UPDATE orders 
        SET total_price = (
            SELECT SUM(subtotal) FROM order_items WHERE order_id = ?
        ) 
        WHERE id = ?
    `,
    getAllOrders: `
        SELECT o.id, o.user_id, o.total_price, o.status, o.created_at, 
               oi.product_id, oi.quantity, oi.subtotal 
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
    `,
    getOrderById: `
        SELECT o.id, o.user_id, o.total_price, o.status, o.created_at, 
               oi.product_id, oi.quantity, oi.subtotal 
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        WHERE o.id = ?
    `,
    updateOrderStatus: `
        UPDATE orders 
        SET status = ? 
        WHERE id = ?
    `,

    // Cart Queries
    getCartItem: `
        SELECT * 
        FROM cart 
        WHERE user_id = ? AND product_id = ?
    `,
    insertCartItem: `
        INSERT INTO cart (user_id, product_id, quantity) 
        VALUES (?, ?, ?)
    `,
    updateCartItem: `
        UPDATE cart 
        SET quantity = ? 
        WHERE user_id = ? AND product_id = ?
    `,
    deleteCartItem: `
        DELETE FROM cart 
        WHERE user_id = ? AND product_id = ?
    `,
    getUserCart: `
        SELECT * 
        FROM cart 
        WHERE user_id = ?
    `,
    clearUserCart: `
        DELETE FROM cart 
        WHERE user_id = ?
    `
};
