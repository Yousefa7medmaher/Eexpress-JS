import express from 'express' ;
import dotenv from 'dotenv' ;
import colors from 'colors';
import routes from './Routes/mainRoute.js'; 

dotenv.config();

const app = express();
app.use(express.json());
const PORT =  process.env.PORT || 5000 ;
app.use('/joo/ahmed/', routes);
app.listen(PORT , ()=>{
    console.log(`Server is listen in port ${PORT}`.bgGreen.black);
}) 