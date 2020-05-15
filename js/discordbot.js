//ログイン処理
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;
var firebase;
var serviceAccount;
var database;
var userJS;
var commentJS;

/***
 * discordbot立ち上げ時の準備
 * 先に準備が必要な処理はここに書く
 * */ 
client.on('ready', () => {
  // 必要なファイルの読み込み
  firebase = require("firebase-admin");
  serviceAccount = require("../../serviceAccountKey.json");

  // テーブルごとのメソッドを持ったjsの読み込み(他のテーブルを作った場合はここで読み込む)
  userJS = require('./user.js');
  commentJS = require('./comment.js');
  
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://kawaii-juku.firebaseio.com"
  });
  
  database = firebase.database();

  // 別ファイルでファイヤベースを利用するための初期化(他のテーブルを作った場合はここで初期化する)
  commentJS.initializeUser(database);
  userJS.initializeUser(database);

  // 準備完了
  console.log('ready...');
});


client.on('message', message =>{
  //Bot自身の発言を無視する呪い
  if(message.author.bot){
    return;
  }

  userJS.writeDiscordUserData(message.author.id, message.author.username);
  commentJS.writeCommentData(message);

});

client.login(token);
