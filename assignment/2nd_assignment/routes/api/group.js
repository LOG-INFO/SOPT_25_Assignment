const csvModule = require('../../modules/csv-module');
const groupMixer = require('../../modules/group-mixer');
const express = require('express');
const router = express.Router();

router.get(['', '/'], function (req, res, next) {
  csvModule.csvToJson("members.csv", (members) => {
    csvModule.csvToJson("groups.csv", (groups) => {
      for (var i = 0; i < members.length; i++) {
          for (var j = 0; j < groups.length; j++) {
            if (members[i].groupIdx === groups[j].groupIdx) {
              members[i]["group"] = groups[j].name;
              break;
            }
          }
      }
      res.send(members);
    })
  })
});

router.get('/:groupIdx', function (req, res, next) {
  const {groupIdx} = req.params;

  csvModule.csvToJson("members.csv", (members) => {
    csvModule.csvToJson("groups.csv", (groups) => {
      var result = [];
      for (var i = 0; i < members.length; i++) {
        if (members[i].groupIdx === groupIdx) {
          for (var j = 0; j < groups.length; j++) {
            if (groupIdx === groups[j].groupIdx) {
              members[i]["group"] = groups[j].name;
              break;
            }
          }
          result.push(members[i]);
        }
      }
      res.send(result);
    })
  })
});

router.put('/mix', function (req, res, next) {
  groupMixer.mix();

  res.send("complete");
});

module.exports = router;
