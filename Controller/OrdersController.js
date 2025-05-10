import db from '../Module/db.js';
import { queries } from '../Module/queries.js';
import { sendResponse } from '../utils/helpers.js';

export const createOrder = async (req, res, next) => {
    try {
        const { user_id, items } = req.body;

        if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
            return sendResponse(res, 400, false, "Invalid order data provided.");
        }

        const [orderResult] = await db.query(queries.insertOrder, [user_id]);
        const orderId = orderResult.insertId;

        for (const item of items) {
            await db.query(queries.insertOrderItem, [orderId, item.product_id, item.quantity, item.subtotal]);
        }

        sendResponse(res, 201, true, "Order created successfully.", { orderId });
    } catch (err) {
        next(err);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const [orders] = await db.query(queries.getAllOrders);

        if (orders.length === 0) {
            return sendResponse(res, 404, false, "No orders found.");
        }

        const groupedOrders = {};

        orders.forEach(order => {
            const { order_id, username, product_name, quantity, subtotal, total_price } = order;

            if (!groupedOrders[order_id]) {
                groupedOrders[order_id] = {
                    order_id,
                    username,
                    total_price,
                    items: []
                };
            }

            groupedOrders[order_id].items.push({ product_name, quantity, subtotal });
        });

        const groupedOrdersArray = Object.values(groupedOrders);

        sendResponse(res, 200, true, "Orders retrieved successfully.", groupedOrdersArray);
    } catch (err) {
        next(err);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const [orderItems] = await db.query(queries.getOrderById, [orderId]);

        if (orderItems.length === 0) {
            return sendResponse(res, 404, false, `No order found with ID: ${orderId}`);
        }

        const { id, user_id, total_price, status, created_at } = orderItems[0];

        const items = orderItems.map(item => ({
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            subtotal: item.subtotal
        }));

        const order = {
            id,
            user_id,
            total_price,
            status,
            created_at,
            items
        };

        sendResponse(res, 200, true, `Order found with ID: ${orderId}`, order);
    } catch (err) {
        next(err);
    }
};


export const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || !status) {
            return sendResponse(res, 400, false, "Please provide order ID and status.");
        }

        const [result] = await db.query(queries.updateOrderStatus, [status, id]);

        if (result.affectedRows === 0) {
            return sendResponse(res, 404, false, `No order found with ID: ${id}`);
        }

        sendResponse(res, 200, true, "Order status updated successfully.", { id, status });
    } catch (err) {
        next(err);
    }
};

export default { createOrder, getAllOrders, getOrderById, updateOrderStatus };
