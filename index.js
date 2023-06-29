const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

app.use(express.json({ extented:false }));

// Define routes
app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'));

app.listen(3000,()=>{
    console.log('Running Server');
});