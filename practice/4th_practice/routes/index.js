const express = require('express');
const router = express.Router();

router.use('/users', require('./user'));
router.use('/boards', require('./board'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
