const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});
// Events
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity("tutorials on TSC", {type: "WATCHING"});

});

bot.on("guildMemberAdd", member => {
   console.log(`${member.id} has joined the server.`);

   const welcomechannel = member.guild.channels.find(c => c.name === "welcome_leave");
   welcomechannel.send(`LOOK OUT EVERYONE! ${member} has joined the party!`);
});

bot.on("guildMemberRemove", member => {
    console.log(`${member.id} has left the server.`);

    const welcomechannel = member.guild.channels.find(c => c.name === "welcome_leave");
    welcomechannel.send(`GOOD RIDDANCE! ${member} has bailed on the server.`);
});

bot.on("channelCreate", channel => {
    console.log(`${channel.name} has been created`);

    const sChannel = channel.guild.channels.find(c => c.name === "general");
    sChannel.send(`${channel.name} has been created.`);
});

bot.on("channelDelete", channel => {
    console.log(`${channel.name} has been deleted`);

    const sChannel = channel.guild.channels.find(c => c.name === "general");
    sChannel.send(`${channel.name} has been deleted.`);
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    const prefix = botconfig.prefix;
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    const commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot,message,args);
});

bot.login(botconfig.token);