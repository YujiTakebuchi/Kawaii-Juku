// Roomの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
var db;

exports.initializeRoom = function initializeRoom(database) {
    db = database;
}

// 書き込み
exports.writeRoomData = function writeRoomData(roomId, name) {
    console.log('wrote room');
    db.ref('Room/' + roomId).set({ //setじゃなくてpushでもできる
        name : name
    });
}

exports.readRoomData = function readUserData() {
    db.ref("Room/").once("value", function(snapshot) {
      return snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}

// discordIdでのユーザー検索
exports.searchRoomData = function searchDiscordUserData(roomId) {
    db.ref('Room/' + roomId).once("value", function(snapshot) {
        return snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}
