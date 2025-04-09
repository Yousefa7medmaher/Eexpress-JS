import db from '../Module/db.js';
import { queries } from '../Module/queries.js';
import { sendResponse } from '../utils/helpers.js';

export const addToCart = async (req, res, next) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        if (!user_id || !product_id || !quantity || quantity <= 0) {
            return sendResponse(res, 400, false, "Invalid input. Please provide valid user_id, product_id, and quantity.");
        }

        const [existing] = await db.query(queries.getCartItem, [user_id, product_id]);

        if (existing.length > 0) {
            await db.query(queries.updateCartItem, [quantity, user_id, product_id]);
        } else {
            await db.query(queries.insertCartItem, [user_id, product_id, quantity]);
        }

        sendResponse(res, 200, true, "Product added to cart successfully.");
    } catch (err) {
        next(err);
    }
};

export const getCartItems = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return sendResponse(res, 400, false, "Invalid user ID.");
        }

        const [cartItems] = await db.query(queries.getUserCart, [user_id]);

        if (cartItems.length === 0) {
            return sendResponse(res, 404, false, "Cart is empty.");
        }

        sendResponse(res, 200, true, "Cart items retrieved successfully.", cartItems);
    } catch (err) {
        next(err);
    }
};

export const updateCartItem = async (req, res, next) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        if (!user_id || !product_id || !quantity || quantity <= 0) {
            return sendResponse(res, 400, false, "Invalid input.");
        }

        const [result] = await db.query(queries.updateCartItem, [quantity, user_id, product_id]);

        if (result.affectedRows === 0) {
            return sendResponse(res, 404, false, "Cart item not found.");
        }

        sendResponse(res, 200, true, "Cart item updated successfully.");
    } catch (err) {
        next(err);
    }
};

export const removeCartItem = async (req, res, next) => {
    try {
        const { user_id, product_id } = req.params;

        if (!user_id || !product_id) {
            return sendResponse(res, 400, false, "Invalid input.");
        }

        const [result] = await db.query(queries.deleteCartItem, [user_id, product_id]);

        if (result.affectedRows === 0) {
            return sendResponse(res, 404, false, "Cart item not found.");
        }

        sendResponse(res, 200, true, "Cart item removed successfully.");
    } catch (err) {
        next(err);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return sendResponse(res, 400, false, "Invalid user ID.");
        }

        const [result] = await db.query(queries.clearUserCart, [user_id]);

        if (result.affectedRows === 0) {
            return sendResponse(res, 404, false, "Cart is already empty.");
        }

        sendResponse(res, 200, true, "Cart cleared successfully.");
    } catch (err) {
        next(err);
    }
};


export default { addToCart, getCartItems, updateCartItem, removeCartItem, clearCart };
