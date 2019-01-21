const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const coins = require("./coins.json");
const xp = require("./xp.json");
const purple = botconfig.purple;
const cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    const jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        const props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity("tutorials on TSC", {type: "WATCHING"});
});


bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }

    let coinAmt = Math.floor(Math.random() * 15) + 1;
    let baseAmt = Math.floor(Math.random() * 15) + 1;
    console.log(`${coinAmt} ; ${baseAmt}`);

    if(coinAmt === baseAmt) {
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt
        };
        // Save data to JSON (NOT SUGGESTED TO USE JSON, IT IS PRONE TO CORRUPTION!!!)
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
            if (err) console.log(err)
        });

        const coinEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setColor("#0000FF")
            .addField("💸", `${coinAmt} coins added!`);

        message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    }

    const xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);

    if (!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }


    const curxp = xp[message.author.id].xp;
    const curlvl = xp[message.author.id].level;
    const nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
        xp[message.author.id].level = curlvl + 1;
        const lvlup = new Discord.RichEmbed()
            .setTitle("Level Up!")
            .setColor(purple)
            .addField("New Level", curlvl + 1);

        message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }

    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if (err) console.log(err)
    });

    const prefix = prefixes[message.guild.id].prefixes;
    if (!message.content.startsWith(prefix)) return;
    if (cooldown.has(message.author.id)) {
        message.delete();
        return message.reply("You have to wait 5 seconds between commands.");
    }
    if (!message.member.hasPermission("ADMINISTRATOR")){
        cooldown.add(message.author.id);
    }


    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    const commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot,message,args);

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)

});

bot.login(botconfig.token);
