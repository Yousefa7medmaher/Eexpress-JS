import express from 'express';

import { 
    showAllProducts, 
    showSpecificProduct, 
    addProduct, 
    updateProduct, 
    deleteProduct 
} from '../Controller/ProductController.js'; 

import { 
    createOrder, 
    getAllOrders, 
    getOrderById, 
    updateOrderStatus 
} from '../Controller/OrdersController.js'; 

import { 
    addToCart, 
    removeCartItem, 
    getCartItems, 
    clearCart 
} from '../Controller/CartController.js';

import { login } from '../Controller/Login.js'; 
import { register } from '../Controller/register.js';  
import { authenticateToken, authorizeRole } from '../middleware/auth.js'; 

const router = express.Router();

// Product Routes
router.get('/products', showAllProducts);  
router.get('/products/:id', showSpecificProduct);
router.post('/products', authenticateToken, authorizeRole('admin'), addProduct);
router.put('/products/:id', authenticateToken, authorizeRole('admin'), updateProduct);
router.delete('/products/:id', authenticateToken, authorizeRole('admin'), deleteProduct);

// Order Routes
router.post('/orders', authenticateToken, createOrder);
router.get('/orders', authenticateToken, authorizeRole('admin'), getAllOrders);
router.get('/orders/:id', authenticateToken, getOrderById);
router.put('/orders/:id/status', authenticateToken, authorizeRole('admin'), updateOrderStatus);

// Cart Routes
router.post('/cart', authenticateToken, addToCart);
router.get('/cart/:user_id', authenticateToken, getCartItems);
router.delete('/cart/:user_id/:product_id', authenticateToken, removeCartItem);
router.delete('/cart/:user_id', authenticateToken, clearCart);

// Auth Routes
router.post('/login', login);
router.post('/register', register);

export default router;