const express = require('express');
const router = express.Router();
const jwt = require('../module/jwt');
const statusCode = require('../module/statusCode');
const util = require('../module/resUtil');
const resMessage = require('../module/responseMessage');
const {LoggedIn} = require('../module/authUtil');

router.post('/publish', (req, res) => {
  const {
    idx,
    grade,
    name
  } = req.body;
  if (!idx || !grade || !name) {
    res.send('wrong parameter');
    return;
  }
  const result = jwt.sign({
    idx,
    grade,
    name
  });
  res.json(result);
})

router.post('/verify', (req, res) => {
  const {
    token
  } = req.headers;
  const result = jwt.verify(token);
  if (result == -1) {
    return res.status(statusCode.UNAUTHORIZED)
      .send(util.successFalse(resMessage.EXPIRED_TOKEN));
  }
  if (result == -2) {
    return res.status(statusCode.UNAUTHORIZED)
      .send(util.successFalse(resMessage.INVALID_TOKEN));
  }
  res.json(result);
});

router.post('/refresh', (req, res) => {
  const refreshToken = req.headers.refreshtoken;
  const selectUser = {
    idx: 1,
    grade: 1,
    id: 'genie',
    name: 'genie'
  };
  const newAccessToken = jwt.refresh(selectUser);
  res.status(statusCode.OK).send(util.successTrue(resMessage.REFRESH_TOKEN, newAccessToken));
});

router.get('/something', LoggedIn, (req, res) => {

  res.status(statusCode.OK).send(util.successTrue(resMessage.VALID_TOKEN, "유효한 토큰"));
});

module.exports = router;