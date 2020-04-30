# インストールした discord.py を読み込む
import os
import discord
import time

import sys
sys.path.append('..')

from firebase import firebase_server

# 自分のBotのアクセストークンに置き換えてください
TOKEN = os.environ["DISCORD_BOT_TOKEN"]
DISCORD = 'DISCORD'

# 接続に必要なオブジェクトを生成
client = discord.Client()

# 起動時に動作する処理
@client.event
async def on_ready():
    # 起動したらターミナルにログイン通知が表示される
    print('ログインしました')
    firebase_server.register_unknown_users(client.users)
#    await send_dm_all_user(client.users, "お前は誰だ")

# メッセージ受信時に動作する処理
@client.event
async def on_message(message):
    # メッセージ送信者がBotだった場合は無視する
    if message.author.bot:
        return
    
    firebase_server.register_unknown_user(message.author)

    dm = await message.author.create_dm()
    await dm.send(message.content)

    #firebase_server.comment_regist(message.author.id, message)
    firebase_server.comment_regist(message.author, message.content)


    print(message.content)

    # 「/neko」と発言したら「にゃーん」が返る処理
#    if message.content == '/neko':
#        await message.channel.send('にゃーん')


# メッセージ削除時に動作する処理
@client.event
async def on_message_delete(message):
    if message.author.bot:
        return
    firebase_server.delete_comment(message.content)

# メッセージ変更時に動作する処理
@client.event
async def on_message_edit(before_message, after_message):
    firebase_server.comment_edit(before_message.content,after_message.content)





# 全員へのDMテスト
async def send_dm_all_user(users, message):
    for user in users:
        print(user.id)
        print(user.name)
#        await send_dm_to(user, message)

async def send_dm_to(user, message):
    print(user.bot)
    if user.bot:
        return
    dm = await user.create_dm()
    await dm.send(message)

# Botの起動とDiscordサーバーへの接続
client.run(TOKEN)

