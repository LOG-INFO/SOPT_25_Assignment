//dbConfig 에서는 mysql 모듈이 아닌 promise-mysql 모듈을 사용합니다!
//async/await 문법을 사용하기 위해서죠.
//dbConfig 파일을 확인해주세요

const pool = require('../config/dbConfig');

module.exports = { // 두 개의 메소드 module화
    queryParam_None: async (query, cb) => { // (...args) expression은 arrow function 사
        pool.query(query).then((result)=>{
            if(cb){
                cb(result);
            }
        });
    },
    queryParam_Arr: async (query, value, cb) => {
        pool.getConnection().then((conn)=>{
            conn.query(query, value).then((result)=>{
                if(cb){
                    cb(result);
                }
                conn.release();
            });
        });
    },
    queryParam_Parse: async (query, value, cb) => {
        let result;

        try {
            var connection = await pool.getConnection();
            result = await connection.query(query, value) || null;

            if(cb){
                cb(result);
            }
        } catch (err) {
            console.log(err);
            connection.rollback(() => {});
            next(err);
        } finally {
            connection.release();
            if (cb) {
                cb(result);
            }
            return result;
        }
    },
    Transaction: async (...args) => {
        let result = "Success";

        try {
            var connection = await pool.getConnection();
            await connection.beginTransaction();

            await args[0](connection, ...args);
            await connection.commit();
        } catch (err) {
            await connection.rollback();
            console.log("mysql error! err log =>" + err);
            result = undefined;
        } finally {
            connection.release();
            return result;
        }
    }
};