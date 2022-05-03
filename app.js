// importing required modules
const express = require("express");
const mongoose = require("mongoose");
const { openApis } = require('./controllers/api');
const authorized = require('./router/router');

// intializign express app
let app = express();

// middleware to parse request data in json
app.use(express.json());

// just default api for page
app.get('/', async ( req, res ) => {
    return res.send('<h2>Hey Guys!</h2>');
})

// middleware for logging api history
app.use('/', async ( req,res,next ) => {
    console.log(`${req.method} ${req.headers.host}${req.url} at ${Date.now().toString()}`, );
    next();
})

// mounting the routes
app.use('/open',openApis);
app.use('/auth',authorized);


// connectingto my local mongodb instance
mongoose.connect( 'mongodb://localhost:27017/express',( err,data ) => {
    if(err){
        console.log("Error connecting DB");
    }
    console.log('Database Connected');
} )

// listening and serving on port 3000
app.listen( 3000,(err,data) => {
    if(err){
        console.log(err);
    }
    console.log("Server on 3000");
})