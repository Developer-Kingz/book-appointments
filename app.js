const client = require('./connection.js')
const express = require('express');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/appointment');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', bookingRoutes);

app.listen(PORT, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();