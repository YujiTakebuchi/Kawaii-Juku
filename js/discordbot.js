//ログイン処理
const Discord = require('discord.js');
const token = '';
client.on('ready', () => {
    console.log('ready...');
});
//Bot自身の発言を無視する呪い
client.on('message', message =>{
    if(message.author.bot){
        return;
   }

writeCommentData(message)

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

client.login(token);
