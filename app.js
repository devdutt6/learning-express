// importing required modules
const express = require("express");

// intializign express app
let app = express();

// middleware to parse request data in json which in built in express
app.use(express.json());
// options permitted in json middleware are
/**
 * 1. inflate
 * 2. revival
 * 3. strict
 * 4. limit
 * 5. strict
 * 6. type
 * 7. verify
 */

// express.static() is a inbuilt express middleware only
const options = {
dotfiles: 'ignore', // allow, deny
etag: false, // if true express generates the weak etags
extensions: ['htm', 'html'],  // first come first serve
// index: false,  // sends specified directories index.html file
maxAge: '1d', // in miliseconds for Catch-Control
redirect: false, // redirect to trailing "/" if uploaded pathname is directory
setHeaders (res, path, stat) { // setting headers depeding on file being uploaded
    res.set('x-timestamp', Date.now())
}
}
// app.engine('html', require('ejs').renderFile);
app.use(express.static('public', options));

// express middleware for accepting other data types like form and urlencoded data
const options2 = {
    extended: true, // for other encoding types
    inflate: true, // weather to accept zipped file or not
    limit: "100kb", // size of data
    parameterLimit: 20, // accpting max number of parameters
    type: "appllication/x-www-form-urlencoded", // specific encoding
    verify (req, res, buf, encoding) { // check before upload
        // function body
    }
}
app.use(express.urlencoded(options2));

app.get("/", (req,res) => {
    // res.render("index.html");
    res.send("index");
})

// listening and serving on port 3000
app.listen( 3000,(err,data) => {
    if(err){
        console.log(err);
    }
    console.log("Server on 3000");
})