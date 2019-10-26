const express = require('express');
const router = express.Router();
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const boardModel = require('../model/board');

router.get('/', (req, res) => {
    boardModel.readAll().then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    boardModel.read(id).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
})
router.post('/', (req, res) => {
    const {
        title,
        content,
        writer,
        pwd,
    } = req.body;
    if (!title || !content || !writer || !pwd) {
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    boardModel.create(title, content, writer, pwd).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
})
router.put('/', (req, res) => {
    const {
        idx,
        title,
        content,
        writer,
        pwd
    } = req.body;
    if (!title || !content || !content || !writer || !pwd) {
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    boardModel.update(idx, title, content, writer, pwd).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
})
router.delete('/', (req, res) => {
    const {
        idx,
        pwd
    } = req.body;
    if (!idx || !pwd) {
        res.status(statusCode.BAD_REQUEST,
            authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    boardModel.delete(idx, pwd).then(({
        code,
        json
    }) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
})
module.exports = router;