// Roomの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
var db;

exports.initializeRoom = function initializeRoom(database) {
    db = database;
}

// 書き込み
exports.writeRoomData = function writeRoomData(roomId, name, isActive = true) {
    console.log('wrote room');
    db.ref('Room/' + roomId).set({ //setじゃなくてpushでもできる
        name : name,
        isActive : isActive
    });
}

/***
 * ルームのアクティブ状態の変更
 * @param {roomId} アクティブ化するルームのID
 * @param {isActive} アクティブ状態の真偽値
 */
exports.updateIsActive = function updateIsActive(roomId, isActive) {
    console.log('update isActive');
    db.ref('Room').child(roomId).update({
        "isActive" : isActive
    });
}

/***
 * ルームのアクティブ化
 * @param {roomId} アクティブ化するルームのID
 */
exports.activateRoom = function activateRoom(roomId) {
    updateIsActive(roomId, true);
}

/***
 * 指定したIDのルームがアクティブかを確認
 * @param {roomId} アクティブかどうかを確認するルームのID
 * @return {Boolean} アクティブかどうか
 */
exports.isActiveRoom = function isActiveRoom(roomId) {
    console.log('is Active?');
    db.ref('Room/' + roomId).once("value", function(snapshot) {
        return snapshot.val().isActive;
    });
}

exports.readRoomData = function readUserData() {
    db.ref("Room/").once("value", function(snapshot) {
      return snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}

// ルーム検索
exports.searchRoomData = function searchDiscordUserData(roomId) {
    db.ref('Room/' + roomId).once("value", function(snapshot) {
        return snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}
