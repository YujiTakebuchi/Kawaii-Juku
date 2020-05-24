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
