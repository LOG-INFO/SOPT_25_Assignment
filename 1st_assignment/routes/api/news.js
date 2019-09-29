var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('This is news page');
});

router.get('/like', function(req, res, next) {
  res.send('This is new like');
});

module.exports = router;
