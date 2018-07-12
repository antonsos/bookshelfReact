const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

//model mongo
const { User } = require('./model/user');
const { Book } = require('./model/book');
const { auth } = require('./middleware/auth');

//config middleware express
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'));

//config mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

//config port from server
const port = process.env.PORT || 3001;

//get book
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

//get user
app.get('/api/auth', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname
  })
})

app.get('/api/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if(err) return res.status(400).send(err);

    res.sendStatus(200);
  })
})

app.get('/api/getReviewer', (req, res) => {
  let id = req.query.id;

  User.findById(id, (err, doc) => {
    if(err) return res.status(400).send(err);

    res.json({
      name: doc.name,
      lastname: doc.lastname
    });
  })
})

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if(err) return res.status(400).send(err);

    res.status(200).send(users);
  })
})

app.get('/api/user_posts', (req, res) => {
  Book.find({ownerId: req.query.user}).exec((err, docs) => {
    if(err) return res.status(400).send(err);

    res.send(docs);
  })
})

//post book
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

//post user
app.post('/api/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if(err) return res.status(400).json({success: false});

    res.status(200).json({
      success: true,
      user: doc
    });
  })
})

app.post('/api/login', (req, res) => {
  
  User.findOne({'email': req.body.email}, (err, user) => {
    if(!user) return res.json({
      isAuth: false,
      message: 'Auth failed, email not found'
    });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({
        isAuth: false,
        message: 'Wrong password'
      });

      user.generateToken((err, user) => {
        if(err) res.status(400).send(err);

        res.cookie('auth', user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        })
      })
    })
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

if(process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.get('/*', (req, res) => {
    res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`server start port: ${port}`)
})