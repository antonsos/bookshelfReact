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

//get
app.get('/api/getBook', (req, res) => {
  let id = req.query.id;

  Book.findById(id, (err, doc) => {
    if(err) return res.status(400).send(err);

    res.send(doc);
  })
})

app.get('/api/books', (req, res) => {
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
    if(err) return res.status(400).send(err);

    res.send(doc);
  })
})

//post
app.post('/api/book', (req, res) => {
  const book = new Book(req.body);

  book.save((err, doc) => {
    if(err) return res.status(400).send(err);

    res.status(200).json({
      post: true,
      bookId: doc._id
    });
  })
})

//update
app.post('/api/book_update', (req, res) => {

  Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
    if(err) return res.status(400).send(err);

    res.status(200).json({
      success: true,
      doc
    });
  })
})

//delete
app.delete('/api/delete_book', (req, res) => {
  let id = req.query.id;

  Book.findByIdAndRemove(id, (err, doc) => {
    if(err) return res.status(400).send(err);

    res.json(true);
  })
})

app.listen(port, () => {
  console.log(`server start port: ${port}`)
})