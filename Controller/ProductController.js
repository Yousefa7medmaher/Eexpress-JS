import db from '../Module/db.js';
import { queries } from '../Module/queries.js';
import { sendResponse } from '../utils/helpers.js';

export const showAllProducts = async (req, res, next) => {
    try {
        const [data] = await db.query(queries.getAllProducts);

        if (data.length === 0) {
            return sendResponse(res, 404, false, "No products found.");
        }

        sendResponse(res, 200, true, "Products retrieved successfully.", data);
    } catch (err) {
        next(err);
    }
};

export const showSpecificProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return sendResponse(res, 400, false, "Invalid product ID provided.");
        }

        const [data] = await db.query(queries.getProductById, [id]);

        if (data.length === 0) {
            return sendResponse(res, 404, false, "Product not found.");
        }

        sendResponse(res, 200, true, `Product found with ID: ${id}`, data[0]);
    } catch (err) {
        next(err);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const { name, price, description, stock } = req.body;

        if (!name || !price || !description || !stock) {
            return sendResponse(res, 400, false, "Please provide all required fields.");
        }

        const [data] = await db.query(queries.insertProduct, [name, price, description, stock]);

        if (data.affectedRows === 0) {
            return sendResponse(res, 500, false, "Failed to insert product.");
        }

        sendResponse(res, 201, true, "Product added successfully.", { id: data.insertId, name, price, description, stock });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, description, stock } = req.body;

        if (!id || !name || !price || !description || !stock) {
            return sendResponse(res, 400, false, "Please provide all required fields.");
        }

        const [result] = await db.query(queries.updateProduct, [name, price, description, stock, id]);

        if (result.affectedRows === 0) {
            return sendResponse(res, 404, false, `No product found with ID: ${id}`);
        }

        sendResponse(res, 200, true, "Product updated successfully.", { id, name, price, description, stock });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return sendResponse(res, 400, false, "Invalid product ID provided.");
        }

        const [result] = await db.query(queries.deleteProduct, [id]);

        if (result.affectedRows === 0) {
            return sendResponse(res, 404, false, `No product found with ID: ${id}`);
        }

        sendResponse(res, 200, true, `Product with ID: ${id} deleted successfully.`);
    } catch (err) {
        next(err);
    }
};

export default { showAllProducts, showSpecificProduct, addProduct, updateProduct, deleteProduct };