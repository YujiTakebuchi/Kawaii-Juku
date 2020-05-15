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
//searchDiscordUserData("303199383397335040");
//searchDiscordUserData("shinki");

//擬似ディスコード
writeUnknownDiscordUserData('303199383397335040').then(value => {
        console.log(value);
    });
//readUserData();

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

async function writeUnknownDiscordUserData(discordId) {
    const user = await searchDiscordUserData(discordId);
    return user;
    //console.log("ひん");
    //console.log(user);
    //if (user != null) {
    //    console.log("どのタイミング？" + user);
    //    //writeDiscordUserData(user.get(), name);
    //}
}

function searchDiscordUserData(discordId) {
    return ref.orderByChild('discordId').startAt(discordId).endAt(discordId).once("value").then(snapshot => {
        //console.log(snapshot.val())
        Object.keys(snapshot.val()).forEach(function(value){
            console.log("やあ");
            resolve(this[value]);
        }, snapshot.val())
    }, function (errorObject) {
        reject('ファイヤベースのエラー!!!');
    });
}