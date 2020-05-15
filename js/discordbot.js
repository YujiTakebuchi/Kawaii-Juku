//ログイン処理
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;
// ユーザーの処理を別ファイル化した時用
// const userJS = require('./user.js');
client.on('ready', () => {
    console.log('ready...');
});
//Bot自身の発言を無視する呪い
client.on('message', message =>{
 // var author = message.author;
    if(message.author.bot){
        return;
   }

  writeCommentData(message);
  writeUnknownDiscordUserData(message.author.id, message.author.username);

});

// FIREBASEの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
// Set the configuration for your app
// TODO: Replace with your project's config object
var firebase = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://kawaii-juku.firebaseio.com"
});

  // Get a reference to the database service
  var database = firebase.database();


// 書き込み
function writeCommentData(message) {
  console.log('function came');
  var comment = message.content
  var id = message.author.id
  var name = message.author.username
  var isRead = false
    firebase.database().ref('comment/' + message.id).set({ //setじゃなくてpushでもできる
      comment: comment,
      id: id,
      name : name,
      isRead : isRead
    });
}

/***
 * 今後消すであろうメソッドたち
 */

function writeUserData(discordId, twitterId, accountType, name) {
  console.log('function came');
    firebase.database().ref('user/' + discordId).set({ //setじゃなくてpushでもできる
      discordId : discordId.toString(),
      twitterId : twitterId,
      accountType : accountType,
      name : name
    });
}

function writeDiscordUserData(discordId, name) {
  writeUserData(discordId, "", "DISCORD", name);
}

function writeUnknownDiscordUserData(discordId, name) {
    console.log("やあ");
    console.log(discordId + ": " + name);
    firebase.database().ref('user/').orderByChild("discordId").equalTo(discordId).once("value", function(snapshot) {
      console.log(discordId + ": " + name);
      return;
    });

    writeDiscordUserData(discordId, name);
    return;
  }


client.login(token);
