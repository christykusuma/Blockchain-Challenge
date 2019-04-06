// Import express library
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const https = require('https');
const http = require('http');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'GET, POST, DELETE, PATCH, PUT, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Credentials', 'true'
  );
  if(req.method === 'OPTIONS') {
    res.end();
  } else {
    next();
  }
})


//Uses the required address to make the request to the bloackchain url
require('./routes/blockchainRoutes')(app);

// Dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);


// var allowedOrigins = ['http://localhost:5000', 'http://localhost:3000'];
// var origin = req.headers.origin;
// if(allowedOrigins.indexOf(origin) > -1){
//   res.setHeader('Access-Control-Allow-Origin', origin);
// }
// console.log('origin', origin)
// res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// res.header('Access-Control-Allow-Credentials', true);
// return next();