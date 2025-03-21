import express from 'express';
import { 
    showAllCustomers, 
    showSpecificCustomer, 
    addCustomer, 
    updateCustomerData, 
    deleteCustomer 
} from '../Controller/CRUD.js'; 
import { login } from '../Controller/Login.js'; 
import { register } from '../Controller/register.js';  
import { authenticateToken, authorizeRole } from '../middleware/auth.js'; 

const router = express.Router();


router.get('/GetAllCustomers', authenticateToken, showAllCustomers);
router.get('/getCustomerById/:id', authenticateToken, showSpecificCustomer);
router.put('/updateCustomerData', authenticateToken, updateCustomerData);
router.post('/addCustomer', authenticateToken, authorizeRole('admin'), addCustomer); 
router.delete('/deleteCustomer/:id', authenticateToken, authorizeRole('admin'), deleteCustomer);  


router.post('/login', login);
router.post('/register', register);

export default router;
