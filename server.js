import express from 'express' ;
import dotenv from 'dotenv' ; 
import colors from 'colors';
import route from './Routes/routes.js';
dotenv.config();

const app = express();
// parse data to json 

app.use(express.json());
const PORT = process.env.PORT  || 5000 ; 

app.use('/todolist',route) ;

app.listen(PORT , ()=>{console.log(`Server running in PORT ${PORT}`.red);
})