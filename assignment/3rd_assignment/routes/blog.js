const express = require('express');
const statusCode = require('../module/statusCode');
const authUtil = require('../module/authUtil');
const responseMessage = require('../module/responseMessage');
const blogModel = require('../model/blog');
const router = express.Router();

router.get('', function (req, res, next) {

  blogModel.readAll().then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

router.get('/:blogId', function(req, res, next) {
  const {blogId} = req.params;
  
  blogModel.read(blogId).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

router.post('', function(req, res, next) {
  const {userId, name, url} = req.body;

  blogModel.create(userId, name, url).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

router.put('/:blogId', function(req, res, next) {
  const {blogId} = req.params;
  const {userId, name, url} = req.body;

  blogModel.update(blogId, userId, name, url).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

router.delete('/:blogId', function(req, res, next) {
  const {blogId} = req.params;
  
  blogModel.delete(blogId).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

module.exports = router;
