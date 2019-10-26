const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil')
/*
아래 infoMap은 DB에 적용하기 이전에 임시 변수입니다.
즉 require 요청한 블록에 생성됩니다.
*/
const userDB = [{
    id: 'sopt',
    pwd: '1234',
    name: 'sopt',
    address: '서울 숭실대학교'
}, {
    id: 'yhc94',
    pwd: 'test',
    name: '양희찬',
    address: '서울 노원구 공릉로 41나길 11'
}];

module.exports = {
    signin: (id, pwd) => {
        return new Promise((resolve, reject) => {
            // TODO 2: 존재하는 아이디인지 확인 (실패시 400 Error)
            const arr = userDB.filter(it => it.id == id);
            if (arr.length == 0) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_USER)
                });
                return;
            }
            // TODO 3: 비밀번호 일치하는지 확인 (실패시 401 Error)
            const user = arr[0];
            if (user.pwd != pwd) {
                resolve({
                    code: statusCode.UNAUTHORIZED,
                    json: authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }
            // TODO 4: 유저 정보 응답하기
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, user)
            });
        });
    },
    signup: (id, pwd, name, address) => {
        return new Promise((resolve, reject) => {
            // TODO 2: 존재하는 ID인지 확인한다. (실패시 401 Error)
            if (userDB.filter(it => it.id == id).length > 0) {
                resolve({
                    code: statusCode.UNAUTHORIZED,
                    json: authUtil.successFalse(responseMessage.ALREADY_ID)
                });
                return;
            }
            // TODO 3: 사용자 정보를 저장한다.
            const userIdx = userDB.push({
                id,
                pwd,
                name,
                address
            });
            console.log(userDB);
            // TODO 4: 새로 추가된 유저 index 반환하기
            resolve({
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, userIdx)
            });
        });
    }
};