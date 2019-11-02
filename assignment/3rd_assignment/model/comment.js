const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const pool = require('../module/pool');

module.exports =  {
    create: (userId, blogId, title, content) => {
        return new Promise((resolve, reject) => {
            const params = [ userId, blogId, title, content];

            pool.queryParam_Arr('INSERT INTO article(user_id, blog_id, title, content) VALUES(?, ?, ?, ?)', params, (result)=>{
                if(result){
                    console.log(result);
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.ARTICLE_CREATE_SUCCESS , result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.ARTICLE_CREATE_FAIL));
                }
            });
        });
    },
    readAll: () => {
        return new Promise((resolve, reject) => {
            pool.queryParam_None('SELECT * FROM article', (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.ARTICLE_READ_ALL_SUCCESS, result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.ARTICLE_READ_ALL_FAIL));
                }
            });
        });
    },
    read: (id) => {
        const params = [id];
        return new Promise((resolve, reject) => {
            pool.queryParam_Arr('SELECT * FROM article WHERE id = ?', params, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.ARTICLE_READ_SUCCESS, result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.ARTICLE_READ_FAIL));
                }
            });
        });
    },
    update: (id, userId, blogId, title, content) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE article SET ';

            if(!id){
                reject("No Target");
            }

            if(!(userId||blogId||title||content)){
                reject("No Change");
            }

            if(userId){
                query += `user_id =  ${userId},`;
            }
            if(blogId){
                query += `blog_id =  ${blogId},`;
            }
            if(title){
                query += `title =  '${title}',`;
            }
            if(content){
                query += `content =  '${content}',`;
            }
            // query = query.substring(0, query.length - 1);
            query += 'updated_time=now()';
            query += ' WHERE id = ' + id;

            console.log(query);
            pool.queryParam_None(query, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.ARTICLE_UPDATE_SUCCESS, id)
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.ARTICLE_UPDATE_FAIL));
                }
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const params = [id];
            pool.queryParam_Arr('DELETE FROM article WHERE id = ?', params, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.ARTICLE_DELETE_SUCCESS, id)
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.ARTICLE_DELETE_FAIL));
                }
            });
        });
    }
};