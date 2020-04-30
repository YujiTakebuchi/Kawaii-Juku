import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


DISCORD = 'DISCORD'
TWITTER = 'TWITTER'

cred = credentials.Certificate("/Users/s1230218/Downloads/kawaii-project-kari-firebase-adminsdk-eks01-bb61710fdf.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# User登録
def register_user(discord_id, twitter_id, account_type, name):
    
    doc_ref = db.collection(u'User').document()
    doc_ref.set({
                u'id': doc_ref.id,
                u'discordId': discord_id,
                u'twitterId': twitter_id,
                u'accountType': account_type,
                u'name': name
                })

# User取得
def get_user(id) :
    doc_ref = db.collection(u'User').document()
    return doc_ref.get(id)

def get_all_user() :
    return db.collection(u'User').stream()

# User更新
def edit_user(id, discord_id, twitter_id, account_type, name) :
    room_doc = db.collection(u'User').document(id)
    room_doc.update({
                    u'discordId': discord_id,
                    u'twitterId': twitter_id,
                    u'accountType': account_type,
                    u'name': name
                    })

# User削除
def delete_user(id) :
    db.collection(u'User').document(id).delete()


# 未登録User確認

def register_unknown_user(user) :
    
    print(user.id)
    print(user.name)
    if (not check_is_user_registered(user.id)) :
        print(user.id)
        register_user(user.id, '', DISCORD, user.name)


def register_unknown_users(users) :
    
    for user in users :
        register_unknown_user(user)


def check_is_user_registered(discord_id) :
    
    for user in get_all_user() :
        if discord_id == user.to_dict().get('discordId') :
            return True

return False



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
                u'id': doc_ref.id, # 発言者のid
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



# RoomMember登録
# デフォルトのユーザー登録時はブロックも管理者権限もなし
def register_room_member_default(user_id, room_id):
    
    register_room_member(user_id, room_id, False, False)


def register_room_member(user_id, room_id, is_blocked, is_admin):
    
    doc_ref = db.collection(u'RoomMember').document()
    doc_ref.set({
                u'id': doc_ref.id,
                u'userId': user_id,
                u'roomId': room_id,
                u'isBlocked': is_blocked,
                u'isAdmin': is_admin
                })

# RoomMember取得
def get_room_member(id) :
    doc_ref = db.collection(u'RoomMember').document()
    return doc_ref.get(id)

def get_all_room_member() :
    return db.collection(u'RoomMember').stream()

# RoomMember更新
def edit_room_member(id, user_id, room_id, is_blocked, is_admin) :
    room_doc = db.collection(u'RoomMember').document(id)
    room_doc.update({
                    u'userId': user_id,
                    u'roomId': room_id,
                    u'isBlocked': is_blocked,
                    u'isAdmin': is_admin
                    })

# RoomMember削除
def delete_room_member(id) :
    db.collection(u'RoomMember').document(id).delete()


# メンバーブロック
def block_room_member(id) :
    room_doc = db.collection(u'RoomMember').document(id)
    # is_blockedの値だけTrueに変更
    room_doc.update({
                    u'isBlocked': True
                    })


# Room登録

def register_room(name) :

    doc_ref = db.collection(u'Room').document()
    doc_ref.set({
                u'id': doc_ref.id,
                u'name': name
                })

# Room取得
def get_room(id) :
    doc_ref = db.collection(u'Room').document()
    return doc_ref.get(id)

def get_all_room() :
    return db.collection(u'Room').stream()

# Room更新
def edit_room(id, name) :
    room_doc = db.collection(u'Room').document(id)
    room_doc.update({
                    u'name': name
                    })

# Room削除
def delete_room(id) :
    db.collection(u'Room').document(id).delete()

# 未登録User確認

#def register_unknown_user(discord_id, name) :
#
#    if (not check_is_user_registered(discord_id)) :
#        print(discord_id)
#        register_user(discord_id, '', DISCORD, name)

def register_unknown_user(user) :

        print(user.id)
        print(user.name)
        if (not check_is_user_registered(user.id)) :
            print(user.id)
            register_user(user.id, '', DISCORD, user.name)


def register_unknown_users(users) :

    for user in users :
        register_unknown_user(user)


def check_is_user_registered(discord_id) :

    for user in get_all_user() :
        if discord_id == user.to_dict().get('discordId') :
            return True

    return False


# test
register_room_member('yahho-')
#
#delete_room('sEpJangb0GchcuyAteFM')
#
#for room in get_all_room() :
#    print(room.id)

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
