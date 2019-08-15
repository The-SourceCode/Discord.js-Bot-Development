const { Client } = require("discord.js");
const { config } = require("dotenv");

// Declares our bot,
// the disableEveryone prevents the client to ping @everyone
const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})

// When the bot's online, what's in these brackets will be executed
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    // Set the user presence
    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "WATCHING"
        }
    }); 
})

// When a message comes in, what's in these brackets will be executed
client.on("message", async message => {
    console.log(`${message.author.username} said: ${message.content}`);
});

// Login the bot
client.login(process.env.TOKEN);
