'use strict';

//our config file should preferably be replaced with discovery / secret vault services
//but this will do for learning node js
require('dotenv').config()
const express = require('express')
//parsing body contents
const bodyParser = require('body-parser')
//safest to pass tokens in cookies as headers can be XSSed
const cookieParser = require('cookie-parser')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

const {login, refresh} = require('./authentication')
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/login', login)
app.post('/refresh', refresh)

//serve public files. Test downloading an image
app.use(express.static('public'))

const jwt = require('json-web-token')

const {verify} = require('./auth-middleware')

app.get('/comments', verify,(req, res) => {
  res.send('GET comments');
});

app.get('/', (req, res) => {
  res.send('Hello GET');
});

app.post('/', (req, res) => {
  res.send('Hello POST');
});

app.put('/', (req, res) => {
  res.send('Hello PUT');
});

app.patch('/', (req, res) => {
  res.send('Hello PATCH');
});

app.options('/', (req, res) => {
  res.send('Hello OPTIONS');
});

app.delete('/', (req, res) => {
  res.send('Hello DELETE');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
