const csvModule = require('./csv-module');

function range(start, end, mod) {
    var list = [];
    for (var i = start; i < end; i++) {
        list.push(i % mod);
    }
    return list;
}

const groupMixerModule = {
    mix: () => {
        csvModule.csvToJson("members.csv", (members) => {
            csvModule.csvToJson("groups.csv", (groups) => {
                var result = [];
                // '갓갓파트장' 그룹은 셔플에서 제외
                for (var i = 0; i < members.length; i++) {
                    if (members[i].groupIdx == 0) {
                        var c = members.splice(i, 1);
                        i--;
                        result.push(c[0]);
                    }
                }
                for (var i = 0; i < groups.length; i++) {
                    if (groups[i].groupIdx == 0) {
                        groups.splice(i, 1);
                        break;
                    }
                }

                var groupIdxList = range(0, members.length, groups.length);

                for (var i = 0; i < members.length; i++) {
                    var targetIdx = Math.floor(Math.random() * (members.length - 1));
                    var tempGroupIdx = groupIdxList[i];
                    groupIdxList[i] = groupIdxList[targetIdx];
                    groupIdxList[targetIdx] = tempGroupIdx;
                }

                for (var i = 0; i < members.length; i++) {
                    members[i]['groupIdx'] = groups[groupIdxList[i]].groupIdx;
                    result.push(members[i]);
                }

                csvModule.jsonToCsv(result, "members.csv", null);
            })
        })
    }
};

module.exports = groupMixerModule;