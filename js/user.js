// Userの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
// Set the configuration for your app
// TODO: Replace with your project's config object
const DISCORD = "DISCORD"
const TWITTER = "TWITTER"
var firebase = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://kawaii-juku.firebaseio.com"
});

// Get a reference to the database service
var database = firebase.database();
var ref = database.ref('user/');
searchUserData("303199383397335041");
searchUserData("shinki");

// 書き込み
function writeUserData(discordId, twitterId, accountType, name) {
  console.log('function came');
    ref.set({ //setじゃなくてpushでもできる
      id: ref.id,
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

function writeUnknownDiscordUserData(discordId, name) {
    writeUserData(discordId, "", DISCORD, name);
}

function readUserData() {
    ref.once("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}

function searchDiscordUserData(discordId) {
    ref.orderByChild("discordId").equalTo(discordId).once("value", function(snapshot) {
        console.log("新規ユーザー獲得！");
        return snapshot.val();
    }, function (errorObject) {
        console.log("お得意様です！");
        return null;
    });
}