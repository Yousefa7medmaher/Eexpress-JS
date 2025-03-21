import express from 'express' ;
import dotenv from 'dotenv' ;
import colors from 'colors';
import route from './Router/routes.js';
const app = express(); 
app.use(express.json());
dotenv.config();


const PORT = process.env.PORT  || 3000 ;
app.use('/test' ,route)
app.listen(PORT , ()=> { 
    console.log(`App listen in port  ${PORT}`.bgBlack.gray);    
})
