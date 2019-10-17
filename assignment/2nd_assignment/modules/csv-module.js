const json2csv = require('json2csv');
const fs = require('fs');
const csvtojson = require('csvtojson');

const csvModule = {
    jsonToCsv: (json, fileName, callback) => {
        json2csv({
            data: json,
            fields: Object.keys(json)
        }, function (err, csv) {
            if (err) console.log(err);
            console.log(csv);
            fs.writeFile(fileName, csv, function (err) {
                if (err) throw err;
                console.log("'" + fileName + ".csv' file saved");
                if (callback) {
                    callback(csv);
                }
            });
        });
    },

    csvToJson: (fileName, callback) => {
        csvtojson().fromFile(fileName).then((json) => {
            if (!json) {
                console.log(`file read err: ${err}`);
                return;
            }
            callback(json);
            console.log(json);
        }, (err) => {
            console.log(`err with readCSV: ${err}`);
        })
    }
};

module.exports = csvModule;