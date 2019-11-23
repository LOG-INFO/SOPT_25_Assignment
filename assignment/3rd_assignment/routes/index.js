const express = require('express');
const router = express.Router();

router.use('/blogs',require('./blog'));
router.use('/articles',require('./article'));
router.use('/comments',require('./comment'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
