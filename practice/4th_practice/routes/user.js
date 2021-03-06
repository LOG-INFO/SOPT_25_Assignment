const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const userModel = require('../model/user');
const encrypt = require('../module/encryption');

/*
    [POST]localhost:3000/user/signup
    request body
    {
        "id":"아이디",
        "password":"비밀번호",
        "name":"이름",
        "address":"주소
    }
    response
    1. 성공 V
    2. 파라미터 오류 V
    3. 아이디 중복
    4. 서버 오류 
*/
router.post('/signup', (req, res) => {
    const {id, password, name, email, phone} = req.body;
    // 파라미터 오류
    if(!id || !password || !name || !email || !phone) {
        const missParameters = Object.entries({id, password, name, email, phone})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(`${responseMessage.NULL_VALUE} ${missParameters}`));
        return;
    }
    encrypt.encrypt(password)
    .then(({hashed, salt}) => userModel.signup({id, name, email, phone, salt, password: hashed}))
    .then(({code, json}) => res.status(code).send(json))
    .catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/*
    [POST]localhost:3000/user/signin
    request body
    {
        "id":"아이디",
        "password":"비밀번호",
    }
    response
    1. 성공
    2. 파라미터 오류
    3. 유저가 존재하지 않음
    4. 비밀번호가 틀린경우
    4. 서버 오류
*/
router.post('/signin', (req, res) => {
    const {id, password} = req.body;
    // 파라미터 값 체크
    if(!id || !password) {
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    userModel.signin({id, password})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

router.get('', (req, res) => {
    userModel.search()
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        res.status(statusCode.INTERNAL_SERVER_ERROR)
        .send(authUtil.successFalse(err));
    });
});

module.exports = router;