const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const pool = require('../module/pool');

module.exports =  {
    create: (userId, articleId, content) => {
        return new Promise((resolve, reject) => {
            const params = [ userId, articleId, content];

            pool.queryParam_Arr('INSERT INTO comment(user_id, article_id, content) VALUES(?, ?, ?)', params, (result)=>{
                if(result){
                    console.log(result);
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.COMMENT_CREATE_SUCCESS , result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.COMMENT_CREATE_FAIL));
                }
            });
        });
    },
    readAll: (articleId) => {
        return new Promise((resolve, reject) => {

            var query = '';
            if(articleId){
                query = `SELECT * FROM comment WHERE article_id = ${articleId}`;
            }else{
                query = `SELECT * FROM comment`;
            }
            pool.queryParam_None(query, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.COMMENT_READ_ALL_SUCCESS, result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.COMMENT_READ_ALL_FAIL));
                }
            });
        });
    },
    read: (id) => {
        const params = [id];
        return new Promise((resolve, reject) => {
            pool.queryParam_Arr('SELECT * FROM comment WHERE id = ?', params, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.COMMENT_READ_SUCCESS, result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.COMMENT_READ_FAIL));
                }
            });
        });
    },
    update: (id, userId, articleId, content) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE comment SET ';

            if(!id){
                reject("No Target");
            }

            if(!(userId||articleId||content)){
                reject("No Change");
            }

            if(userId){
                query += `user_id =  ${userId},`;
            }
            if(articleId){
                query += `article_id =  ${articleId},`;
            }
            if(content){
                query += `content =  '${content}',`;
            }
            // query = query.substring(0, query.length - 1);
            query += 'updated_time=now()';
            query += ' WHERE id = ' + id;

            pool.queryParam_None(query, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.COMMENT_UPDATE_SUCCESS, id)
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.COMMENT_UPDATE_FAIL));
                }
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const params = [id];
            pool.queryParam_Arr('DELETE FROM comment WHERE id = ?', params, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.COMMENT_DELETE_SUCCESS, id)
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.COMMENT_DELETE_FAIL));
                }
            });
        });
    }
};