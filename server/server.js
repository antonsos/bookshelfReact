const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

//model mongo
const { User } = require('./model/user');
const { Book } = require('./model/book');

//config middleware express
app.use(bodyParser.json());
app.use(cookieParser());

//config mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

//config port from server
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server start port: ${port}`)
})