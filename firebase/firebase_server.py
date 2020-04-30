import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


DISCORD = 'DISCORD'
TWITTER = 'TWITTER'

cred = credentials.Certificate("/Users/s1230218/Downloads/kawaii-project-kari-firebase-adminsdk-eks01-bb61710fdf.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# User登録
def register_user(discordId, twitterId, accountType, name):
    
    doc_ref = db.collection(u'User').document()
    doc_ref.set({
                u'id': doc_ref.id,
                u'discordId': discordId,
                u'twitterId': twitterId,
                u'accountType': accountType,
                u'name': name
                })

# User取得


# User更新

# User削除


# Comment登録

# Comment取得

# Comment更新

# Comment削除


# RoomMember登録
def register_room_member(id, user_id, room_id):
    
    register_user(id, user_id, room_id, False, False)


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

# RoomMember更新

# RoomMember削除


# 未登録User確認

def register_unknown_user(discord_id, name) :

    if (not check_is_user_registered(discord_id)) :
        register_user(discord_id, '', DISCORD, name)


def check_is_user_registered(discord_id) :

    for user in get_all_user :
        if user.discordId == discord_id :
            return True

    return False

