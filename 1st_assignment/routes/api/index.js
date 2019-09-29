var express = require('express');
var router = express.Router();

router.use('/blog', require('./blog'));
router.use('/cafe', require('./cafe'));
router.use('/news', require('./news'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('This is api index');
});

module.exports = router;
