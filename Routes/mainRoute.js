import express from 'express';
const router = express.Router();

import {loginController} from '../Controller/login.js' ;
import {registerController} from '../Controller/register.js' ;
import {authenticateToken , authorizeRole} from '../middleware/auth.js' ; 

//login 
router.route('/login').post(loginController);

//register 
router.route('/register').post(registerController);


router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: "Profile accessed successfully",
        user: req.user  
    });
});


router.get('/admin', authenticateToken, authorizeRole("admin"), (req, res) => {
    res.json({
        success: true,
        message: "Admin accessed successfully",
        user: req.user 
    });
});
export default router; 