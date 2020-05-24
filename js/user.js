// Userの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
const DISCORD = "DISCORD";
const TWITTER = "TWITTER";

var db;

exports.initializeUser = function initializeUser(database) {
    db = database;
}

// 書き込み
function writeUserData(discordId, twitterId, accountType, name) {
    console.log('wrote user');
    db.ref('User/' + discordId).set({ //setじゃなくてpushでもできる
        discordId : discordId.toString(),
        twitterId : twitterId,
        accountType : accountType,
        name : name
    });
}

function writeDiscordUserData(discordId, name) {
  writeUserData(discordId, "", DISCORD, name);
}

function writeTwitterUserData(twitterId, name) {
  writeUserData("", twitterId, TWITTER, name);
}

exports.writeDiscordUserData = function writeDiscordUserData(discordId, name) {
    writeUserData(discordId, "", DISCORD, name);
}

exports.readUserData = function readUserData() {
    db.ref('User/').once("value", function(snapshot) {
      return snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}

// discordIdでのユーザー検索
exports.searchDiscordUserData = function searchDiscordUserData(discordId) {
    db.ref('User/').orderByChild("discordId").equalTo(discordId).once("value", function(snapshot) {
        return snapshot.val();
    });
}
