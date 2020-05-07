using Discord;
using Discord.WebSocket;
using System;
using System.IO;
using System.Threading.Tasks;
using discordbot;
using UnityEngine;

namespace discordbot
{
    public static class DiscordbotCSharp
    {
        private static void Main() => MainAsync().Wait();

        private static async Task MainAsync()
        {
            var client = new DiscordSocketClient();
            var token = Environment.GetEnvironmentVariable("DISCORD_BOT_TOKEN"); ;

            await client.LoginAsync(TokenType.Bot, token);
            await client.StartAsync();

            client.MessageReceived += OnMessageReceived;

            Console.ReadLine();
        }

        private static async Task OnMessageReceived(SocketMessage arg)
        {
            if (arg.Author.IsBot == true)
            {
                return;
            }
            await arg.Channel.SendMessageAsync(arg.Content);
            File.WriteAllText(@"C:\Users\Chamboo\UnityProjects\New Unity Project\Assets\comment.txt", arg.Content.ToString());

            //DiscordbotCS.generateTextFile(arg.Content.ToString());

            //Comment.GetInstance().setCommentText(arg.Content.ToString());
            //DiscordbotCS.dataLog();
            Console.WriteLine(arg.Content.ToString());
        }
    }
}