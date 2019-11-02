const express = require('express');
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const userModel = require('../model/user');
const pool = require('../module/poolAsync');
const router = express.Router();

const userDB = [];

/*
[Request]
{
    "id":"아이디",
    "password":"패스워드",
    "name":"이름",
    "address":"주소"
}

[Response]
1. 성공
2. 아이디 중복
3. 파라미터 오류
4. 서버 오류
*/

router.post('/signup', function (req, res, next) {
    const {id,pwd,name,address} = req.body;
    console.log(id, pwd, name, address)
    // TODO 1: 파라미터 값 체크
    if (!id || !pwd || !pwd || !name || !address) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    userModel.signup(id, pwd, name, address)
        .then(({
            code,
            json
        }) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        })
});

/*
[Request]
{
    "id":"아이디",
    "password":"패스워드"
}

[Response]
1. 성공
2. 파라미터 오류
3. 유저가 존재하지 않음
4. 패스워드 틀린 경우
*/

router.post('/signin', function (req, res, next) {
    const {id,pwd} = req.body;
    console.log(id, pwd);
    // TODO 1: 파라미터 값 체크
    if (!id || !pwd) {
        res.status(statusCode.BAD_REQUEST)
            .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    userModel.signin(id, pwd)
        .then(({
            code,
            json
        }) => res.status(code).send(json))
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR))
        });
});

module.exports = router;