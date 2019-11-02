const express = require('express');
const statusCode = require('../module/statusCode');
const authUtil = require('../module/authUtil');
const responseMessage = require('../module/responseMessage');
const articleModel = require('../model/article');
const router = express.Router();

router.get('', function (req, res, next) {
  const {blogId} = req.params;
  console.log(blogId);

  articleModel.readAll(blogId).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

router.get('/:articleId', function(req, res, next) {
  const {articleId} = req.params;
  
  articleModel.read(articleId).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

router.post('', function(req, res, next) {
  const {userId, blogId, title, content} = req.body;

  articleModel.create(userId, blogId, title, content).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

router.put('', function(req, res, next) {
  const {articleId, userId, blogId, title, content} = req.body;

  articleModel.update(articleId, userId, blogId, title, content).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

router.delete('', function(req, res, next) {
  const {articleId} = req.body;
  
  articleModel.delete(articleId).then(({code, json}) => {
    res.status(code).send(json);
  }).catch(err => {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
  });
});

module.exports = router;
