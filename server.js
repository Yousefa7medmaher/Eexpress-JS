const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const app = express();
 
dotenv.config();

app.use(express.json());

app.use('/joo/ahmed/',require('./Routes/routes'))

const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => {
    console.log(colors.bgGreen.black(`Listening on port ${PORT}`));
});
