import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials

cred = credentials.Certificate("/Users/s1230218/Downloads/kawaii-project-kari-firebase-adminsdk-eks01-bb61710fdf.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# User登録
def register_user(id, discordId, twitterId, accountType, name):

    doc_ref = db.collection(u'User').document()
    doc_ref.set({
                u'id': id,
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

# RoomMember取得

# RoomMember更新

# RoomMember削除


# 未登録User登録


