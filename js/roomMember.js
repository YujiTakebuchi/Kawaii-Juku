var db;

exports.initializeRoomMember = function initializeRoomMember(database) {
    db = database;
}

// 書き込み
exports.writeRoomMemberData = function writeRoomMemberData(roomId, userId, isBlocked = false, isAdmin = false) {
    console.log('wrote room member');
    var roomMemberId = roomId + userId
    db.ref('RoomMember/' + roomMemberId).set({ //setじゃなくてpushでもできる
        roomId : roomId,
        userId : userId,
        isBlocked : isBlocked,
        isAdmin : isAdmin
    });
}

/***
 * 指定したIDのルームメンバーが管理者であるかを確認
 * @param {roomMemberId} 管理者かどうかを確認するルームメンバーのID
 * @return {Boolean} 管理者かどうか
 */
exports.isAdminRoomMember = function isAdminRoomMember(roomMemberId) {
    console.log('is Admin?');
    db.ref('RoomMember/' + roomMemberId).once("value", function(snapshot) {
        return snapshot.val().isAdmin;
    });
}
