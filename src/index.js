const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const mongoose = require('mongoose');
const app = express();

// const multer= require("multer");
// const { AppConfig } = require('aws-sdk');

app.use(bodyParser.json());

// app.use( multer().any())


mongoose.connect("mongodb+srv://Madhurilenka:Madhuri1998@cluster0.zcysdvm.mongodb.net/sivilaTechnology", {
    useNewUrlParser: true
})
 .then( () => console.log("MongoDb is connected"))
 .catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});