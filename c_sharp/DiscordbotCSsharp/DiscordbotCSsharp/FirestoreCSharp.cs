using System;
using System.Collections.Generic;
using System.Text;
using Firebase;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;

namespace discordbot
{
    class FirestoreCSharp
    {
        public static string DISCORD = "DISCORD";
        public static string TWITTER = "TWITTER";

        public FirestoreCSharp(){
            
        }

        public void registerUser(string discordId, string twitterId, string accountType, string name)
        {
            FirestoreDb db = FirestoreDb.Create("kawaii-project-kari");
            DocumentReference docRef = db.Collection("User").Document();
            Dictionary<string, object> user = new Dictionary<string, object>
            {
                { "id", docRef.Id },
                { "discordId", discordId },
                { "twitterId", twitterId },
                { "accountType", accountType },
                { "name", name }
            };

            docRef.SetAsync(user);
            // [END fs_add_data_1]
            Console.WriteLine("Added data to the alovelace document in the users collection.");

        }
        public static void Main(string[] args)
        {
            FirestoreCSharp cs = new FirestoreCSharp();
            cs.registerUser("disco", "twitter", "DISCORD", "test");
        }
    }
}