// Roomの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
var db;

exports.initializeRoom = function initializeRoom(database) {
    db = database;
}

// 書き込み
exports.writeRoomData = function writeRoomData(roomId, name) {
    console.log('function came');
    db.ref('room/' + roomId).set({ //setじゃなくてpushでもできる
        name : name
    });
}

exports.readRoomData = function readUserData() {
    db.ref("room/").once("value", function(snapshot) {
      return snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}

// discordIdでのユーザー検索
exports.searchRoomData = function searchDiscordUserData(roomId) {
    db.ref('user/' + roomId).once("value", function(snapshot) {
        return snapshot.val();
    });
}