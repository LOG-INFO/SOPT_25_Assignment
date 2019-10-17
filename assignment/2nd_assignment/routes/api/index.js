var express = require('express');
var router = express.Router();

router.use('/group', require('./group'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('This is api index');
});

module.exports = router;
