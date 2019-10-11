require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./models')

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/faves', function(req, res) {
  // res.send(req.body)
  db.fave.findOrCreate({
    where: {
      imdbid: req.body.imdbid
    },
    defaults: {
      title: req.body.title
    }
  }).then(function([fave, created]){
    console.log(`${fave.title} is ${created ? 'now in my faves' : 'already a fave'}`)
    res.redirect('/faves')
  })
})

app.get('/faves', function(req, res){
  // res.send("MY FAVES")
  db.fave.findAll()
  .then(function(foundFaves){
    // res.send(foundFaves)
    res.render('faves', { faves: foundFaves })
  })
})

// Brings in our results controller
app.use('/search', require('./routes/search'));

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
