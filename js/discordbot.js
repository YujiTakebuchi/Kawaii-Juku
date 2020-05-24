//ログイン処理
  // 必要なファイルの読み込み
const Discord = require('discord.js');
const firebase = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKeyKari.json");
// テーブルごとのメソッドを持ったjsの読み込み(他のテーブルを作った場合はここで読み込む)
const roomJS = require('./room.js');
const userJS = require('./user.js');
const roomMemberJS = require('./roomMember.js');
const commentJS = require('./comment.js');
const templateMessages = require('./templateMessages.js');

const client = new Discord.Client();
const token = process.env.DISCORD_BOT_TOKEN;

/***
 * discordbot立ち上げ時の準備
 * 先に準備が必要な処理はここに書く
 * */ 
client.on('ready', () => {
  
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://kawaii-project-kari.firebaseio.com/"
  });
  
  const database = firebase.database();

  // 別ファイルでファイヤベースを利用するための初期化(他のテーブルを作った場合はここで初期化する)
  roomJS.initializeRoom(database);
  userJS.initializeUser(database);
  roomMemberJS.initializeRoomMember(database);
  commentJS.initializeComment(database);

  // 起動時にDMを送ることでDMでもコメントを送れることを通知する
//  client.users.cache.filter(user => !user.bot).forEach(notBotUser =>
//                                                       notBotUser.send(templateMessages.WELLCOME_FRESHERS)
//                                                       );

  // 準備完了
  console.log('ready...');
});

/***
 * メッセージを受け取った時の処理
 * message: discordで受け取ったメッセージのオブジェクト
 * リファレンス: https://github.com/discordjs/discord.js/blob/a6510d6a6185b0b589e3aecb1b22b97bdf50fd04/src/structures/Message.js
 *  */ 
client.on('message', message =>{
  var channel = message.channel;
  var author = message.author;
  var roomMemberId = channel.id + author.id;
    
  //Bot自身の発言を無視する呪い
  if(author.bot){
    return;
  }

  roomJS.writeRoomData(channel.id, channel.guild.name);
  userJS.writeDiscordUserData(author.id, author.username);
  roomMemberJS.writeRoomMemberData(channel.id, author.id);
  commentJS.writeCommentData(message.id, roomMemberId, message.content);
});

client.login(token);
