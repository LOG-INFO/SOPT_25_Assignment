const csvModule = require('../../modules/csv-module');
const express = require('express');
const router = express.Router();

router.get(['', '/'], function(req, res, next) {
  csvModule.csvToJson("members.csv", (json)=>{
    res.send(json);
  })
});

router.get('/:groupIdx', function(req, res, next) {
  const {groupIdx} = req.params;
  
  csvModule.csvToJson("members.csv", (json)=>{
    var result = [];
    for(var i=0;i<json.length;i++){
      if(json[i].groupId === groupIdx){
        result.push(json[i]);
      }
    }
    res.send(result);
  })
});

module.exports = router;
