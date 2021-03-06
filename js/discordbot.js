//ログイン処理
  // 必要なファイルの読み込み
const Discord = require('discord.js');
const firebase = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");
// テーブルごとのメソッドを持ったjsの読み込み(他のテーブルを作った場合はここで読み込む)
const userJS = require('./user.js');
const commentJS = require('./comment.js');

const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;
var database;

/***
 * discordbot立ち上げ時の準備
 * 先に準備が必要な処理はここに書く
 * */ 
client.on('ready', () => {
  
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://kawaii-juku.firebaseio.com"
  });
  
  database = firebase.database();

  // 別ファイルでファイヤベースを利用するための初期化(他のテーブルを作った場合はここで初期化する)
  userJS.initializeUser(database);
  commentJS.initializeUser(database);

  // 準備完了
  console.log('ready...');
});

/***
 * メッセージを受け取った時の処理
 * message: discordで受け取ったメッセージのオブジェクト
 * リファレンス: https://github.com/discordjs/discord.js/blob/a6510d6a6185b0b589e3aecb1b22b97bdf50fd04/src/structures/Message.js
 *  */ 
client.on('message', message =>{
  //Bot自身の発言を無視する呪い
  if(message.author.bot){
    return;
  }

  userJS.writeDiscordUserData(message.author.id, message.author.username);
  commentJS.writeCommentData(message);

});

client.login(token);
