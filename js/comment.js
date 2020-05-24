// Commentの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
// Set the configuration for your app
// TODO: Replace with your project's config object
var db;

exports.initializeComment = function initializeComment(database) {
    db = database;
}

// 書き込み
exports.writeCommentData = function writeCommentData(commentId, roomMemberId, comment, isRead = false) {
    console.log('wrote comment');
    
    db.ref('Comment/' + commentId).set({ //setじゃなくてpushでもできる
        roomMemberId : roomMemberId,
        comment : comment,
        isRead : isRead
      });
  }
