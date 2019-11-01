const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const pool = require('../module/pool');

module.exports =  {
    create: (userId, blogName, url) => {
        return new Promise((resolve, reject) => {
            const params = [ userId, blogName, url];

            pool.queryParam_Arr('INSERT INTO blog(user_id, name, url) VALUES(?, ?, ?)', params, (result)=>{
                if(result){
                    console.log(result);
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.BLOG_CREATE_SUCCESS , result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.BLOG_CREATE_FAIL));
                }
            });
        });
    },
    readAll: () => {
        return new Promise((resolve, reject) => {
            pool.queryParam_None('SELECT * FROM blog', (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.BLOG_READ_ALL_SUCCESS, result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.BLOG_READ_ALL_FAIL));
                }
            });
        });
    },
    read: (id) => {
        const params = [id];
        return new Promise((resolve, reject) => {
            pool.queryParam_Arr('SELECT * FROM blog WHERE id = ?', params, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.BLOG_READ_ALL_SUCCESS, result[0])
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.BLOG_READ_FAIL));
                }
            });
        });
    },
    update: (id, userId, blogName, url) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE blog SET ';

            if(!(userId||blogName||url)){
                reject("No Change");
            }

            if(userId){
                query += `user_id =  ${userId},`;
            }
            if(blogName){
                query += `name =  '${blogName}',`;
            }
            if(url){
                query += `url =  '${url}',`;
            }
            // query = query.substring(0, query.length - 1);
            query += 'updated_time=now()';
            query += ' WHERE id = ' + id;

            pool.queryParam_None(query, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.BLOG_UPDATE_SUCCESS, id)
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.BLOG_UPDATE_FAIL));
                }
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const params = [id];
            pool.queryParam_Arr('DELETE FROM blog WHERE id = ?', params, (result)=>{
                if(result){
                    resolve({
                        code: statusCode.OK,
                        json: authUtil.successTrue(responseMessage.BLOG_DELETE_SUCCESS, id)
                    });
                }else{
                    reject(authUtil.successFalse(responseMessage.BLOG_DELETE_FAIL));
                }
            });
        });
    }
};