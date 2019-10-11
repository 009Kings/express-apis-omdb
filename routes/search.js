const express = require('express');
const router = express.Router();
const axios = require('axios');

const BASE_URL = 'http://www.omdbapi.com/';

router.get('/', function (req, res) {
  axios.get(BASE_URL, {
    params: {
      s: req.query.q,
      apikey: process.env.API_KEY
    }
  }).then(function(movieResults) {
    // res.send(movieResults.data.Search)
    res.render('results', { query: req.query.q, results: movieResults.data.Search });
  });
});

router.get('/:omdbid', function (req, res) {
  axios.get(BASE_URL, {
    params: {
      i: req.params.omdbid,
      apikey: process.env.API_KEY
    }
  }).then(function(foundMovie) {
    // res.send(foundMovie.data);
    res.render('detail', { movie: foundMovie.data })
  });
});

module.exports = router;
