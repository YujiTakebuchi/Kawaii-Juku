# インストールした discord.py を読み込む
import discord
import firebase_admin_test

# 自分のBotのアクセストークンに置き換えてください
TOKEN = 'NzA0ODk4OTU0NzYzOTYwMzMx.Xqj2qg.YaDZXnq5P6_kCd54Fhl-5dxvevc'

# 接続に必要なオブジェクトを生成
client = discord.Client()

# 起動時に動作する処理
@client.event
async def on_ready():
    # 起動したらターミナルにログイン通知が表示される
    print('ログインしました')

# メッセージ受信時に動作する処理
@client.event
async def on_message(message):
    # メッセージ送信者がBotだった場合は無視する
    if message.author.bot:
        return
    # 「/neko」と発言したら「にゃーん」が返る処理
    if message.content == '/neko':
        await message.channel.send('にゃーん')

    #firebase_admin_test.comment_regist(message.author.id, message)
    firebase_admin_test.comment_regist(message.author, message.content)

# メッセージ削除時に動作する処理
@client.event
async def on_message_delete(message):
    if message.author.bot:
        return
    firebase_admin_test.delete_comment(message.content)

# メッセージ変更時に動作する処理
@client.event
async def on_message_edit(before_message, after_message):
    firebase_admin_test.comment_edit(before_message.content,after_message.content)

# Botの起動とDiscordサーバーへの接続
client.run(TOKEN)
