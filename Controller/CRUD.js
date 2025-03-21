import db from '../Module/db.js';
import { queries } from '../Module/queries.js';
import { sendResponse } from '../utils/helpers.js';

export const showAllCustomers = async (req, res, next) => {
    try {
        const [data] = await db.query(queries.getAllCustomers);

        if (data.length === 0) {
            return sendResponse(res, 404, false, "No data found.");
        }

        sendResponse(res, 200, true, "Data found successfully.", data);
    } catch (err) {
        next(err);
    }
};

export const showSpecificCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return sendResponse(res, 400, false, "Invalid ID provided");
        }

        const [data] = await db.query(queries.getCustomerById, [id]);

        if (data.length === 0) {
            return sendResponse(res, 404, false, "Not found this ID");
        }

        sendResponse(res, 200, true, `User found with ID: ${id}`, data[0]);
    } catch (err) {
        next(err);
    }
};


export const addCustomer = async (req, res, next) => {
    try {
        const { name, email, phone, address } = req.body;

        if (!name || !email || !phone || !address) {
            return sendResponse(res, 400, false, "Please provide all required fields");
        }

        const [data] = await db.query(queries.insertCustomer, [name, email, phone, address]);

        if (data.affectedRows === 0) {
            return sendResponse(res, 500, false, "Failed to insert data");
        }

        sendResponse(res, 201, true, "Data inserted successfully", { id: data.insertId, name, email, phone, address });
    } catch (err) {
        next(err);
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return sendResponse(res, 400, false, "Invalid ID provided");
        }

        const [result] = await db.query(queries.deleteCustomer, [id]);

        if (result.affectedRows === 0) {
            return sendResponse(res, 404, false, `No customer found with ID: ${id}`);
        }

        sendResponse(res, 200, true, `Customer with ID: ${id} deleted successfully`);

    } catch (err) {
        next(err);
    }
};


export const updateCustomerData = async (req, res, next) => {
    try {
        const { id, name, email, phone, address } = req.body;

        if (!id || !name || !email || !phone || !address) {
            return sendResponse(res, 400, false, "Please provide all required fields");
        }
 
        const [result] = await db.query(queries.updateCustomer, [name, email, phone, address, id]);
 
        if (result.affectedRows === 0) {
            return sendResponse(res, 404, false, `No customer found with ID: ${id}`);
        }

        sendResponse(res, 200, true, "Data updated successfully", { id, name, email, phone, address });

    } catch (err) {
        next(err);
    }
};

export default { showAllCustomers, showSpecificCustomer, addCustomer ,updateCustomerData, deleteCustomer};