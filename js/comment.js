// Commentの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
// Set the configuration for your app
// TODO: Replace with your project's config object
var db;

exports.initializeUser = function initializeUser(database) {
    db = database;
}

// 書き込み
exports.writeCommentData = function writeCommentData(message) {
    console.log('function came');
    var comment = message.content
    var id = message.author.id
    var name = message.author.username
    var isRead = false
      db.ref('comment/' + message.id).set({ //setじゃなくてpushでもできる
        comment: comment,
        id: id,
        name : name,
        isRead : isRead
      });
  }