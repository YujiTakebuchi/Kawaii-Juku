using Discord;
using Discord.WebSocket;
using System;
using System.Threading.Tasks;

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
        Console.WriteLine(arg.Content.ToString());
    }
}