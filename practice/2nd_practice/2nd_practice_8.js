// JSON <-> CSV

const json2csv = require('json2csv');
const jsonArray = [{
        id: 'admin',
        pw: 'admin',
        name: '관리자'
    },
    {
        id: 'heesung',
        pw: '1q2w3e4r!',
        name: '윤희성'
    }, , {
        id: 'starbucks',
        pw: 'JamongBlackHoneyTea',
        name: '스타벅스'
    }
];
const resultCsv = json2csv.parse(jsonArray);
console.log(resultCsv);

console.log();

const csv = require('csvtojson');
csv().fromFile('./csvtojson.csv').then((jsonArr) => {
    if (!jsonArr) {
        console.log(`file read err: ${err}`);
        return;
    }
    console.log(jsonArr);
}, (err) => {
    console.log(`err with readCSV: ${err}`);
})