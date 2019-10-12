// DIGEST = PBKDF2(PRF, Password, Salt, c, DLen)
// 
// PRF: 난수(예: HMAC)
// Password: 패스워드
// Salt: 암호학 솔트
// c: 원하는 iteration 반복 수
// DLen: 원하는 다이제스트 길이

const crypto = require('crypto');
const fs = require('fs');
const password = 'password';
crypto.randomBytes(32, (err, salt) => {
    if (err) throw err;
    crypto.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        fs.writeFile('password.txt', derivedKey.toString('hex'), (err) => {
            if (err) throw err;
            console.log('complete write password');
        })
    })
})