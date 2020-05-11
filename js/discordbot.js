//ログイン処理
const Discord = require('discord.js');
const client = new Discord.Client();
const token = '';
client.on('ready', () => {
    console.log('ready...');
});
//Bot自身の発言を無視する呪い
client.on('message', message =>{
    if(message.author.bot){
        return;
   }
//↓ここに後述のコードをコピペする↓
writeUserData(message)
//↑ここに後述のコードをコピペする↑
});

// FIREBASEの処理！！！！！！！！！！！！！！！！！！！！！！！！！！！！
// Set the configuration for your app
// TODO: Replace with your project's config object
var firebase = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://kawaii-juku.firebaseio.com"
});

  // Get a reference to the database service
  var database = firebase.database();


// 書き込み
function writeUserData(message) {
  console.log('function came');
  var comment = message.content
  var id = message.id
  var name = message.author
    firebase.database().ref('comment/').push({
      comment: comment,
      id: id,
      name : name
    });
}

  // 読み取り
//   var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   // ...
// });

client.login(token);
