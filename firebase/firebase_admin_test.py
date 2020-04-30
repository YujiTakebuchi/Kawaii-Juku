#### firebase cloud firestore
#### 機能：データの追加、読み取り、削除、更新
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# 秘密キー：kawaii-project-kari-firebase-adminsdk-eks01-75ec2d67c5.json

# 認証ファイルにアクセス
cred = credentials.Certificate("./kawaii-project-kari-firebase-adminsdk-eks01-75ec2d67c5.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# コメントデータの追加
# コメント登録用の関数
def comment_regist(discoId,comment): # discoId:message.author.idでコメント発言者のdiscoIdを確認！
    user_doc = db.collection(u'User').where(u'discoId', u'==', u'{}'.format(discoId)).stream() # discoIdを元に発言者の情報を取得

    for doc in user_doc:
        user_id = doc.get('id')
    roommember_doc = db.collection(u'RoomMember').where(u'userId', u'==',user_id).stream()
    for doc in roommember_doc:
        room_id = doc.get('roomId')

    doc_ref = db.collection(u'Comment').document()
    doc_ref.set({
        u'comment': comment,
        u'id': user_id, # 発言者のid
        u'roomId': room_id,
        u'userId': user_id
    })

# コメントデータの削除
## delete_comment:デリート対象のコメント
def delete_comment(comment):
    comment_doc = db.collection(u'Comment').where(u'comment', u'==', u'{}'.format(comment)).stream()
    for doc in comment_doc:
        doc_id = doc.id
        db.collection(u'Comment').document(u'{}'.format(doc_id)).delete()
    print('deleted!')


# コメントデータの取得、表示
# コメントをunityで表示
def comment_display(discoId,comment):
    comment_doc = db.collection(u'Comment').stream()

    for doc in docs:
        print(u'{} => {}'.format(doc.id, doc.to_dict()))

# コメントデータ更新
def comment_edit(before_comment,after_comment):
    comment_doc = db.collection(u'Comment').where(u'comment', u'==', u'{}'.format(before_comment)).stream()
    for doc in comment_doc:
        edit_doc = db.collection(u'Comment').document(u'{}'.format(doc.id))
        edit_doc.update({u'comment': after_comment})

##
# Userデータの取得
def user_acquire():
    acquire_doc = db.collection(u'User').stream()

    for doc in docs:
        print(u'{} => {}'.format(doc.id, doc.to_dict()))







# テスト用
def test(discoId,comment):
    user_doc = db.collection(u'User').where(u'discoId', u'==', u'{}'.format(discoId)).stream() # discoIdを元に発言者の情報を取得

    for doc in user_doc:
        user_id = doc.get('id')
    roommember_doc = db.collection(u'RoomMember').where(u'userId', u'==',user_id).stream()
    for doc in roommember_doc:
        room_id = doc.get('roomId')
    print(user_id)
    print(room_id)
    print(comment)
