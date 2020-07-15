const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const appRoutes = require('./routes/appRoutes');

require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

//connect mongoDB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("Database connected!"))
.catch(err=>{console.log(`DB Connection Error: ${err.message}`)});

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})

//app routes
app.use('/', appRoutes);