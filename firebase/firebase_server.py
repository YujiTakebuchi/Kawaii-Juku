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
def get_all_user() :
    return db.collection(u'User').stream()

# User更新

# User削除


# Comment登録

# Comment取得

# Comment更新

# Comment削除



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
#register_room('yahho-')
#
#delete_room('sEpJangb0GchcuyAteFM')
#
#for room in get_all_room() :
#    print(room.id)

