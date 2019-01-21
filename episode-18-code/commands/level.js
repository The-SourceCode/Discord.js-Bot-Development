const Discord = require("discord.js");
const botconfig = require("../botconfig");
let purple = botconfig.purple;
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {
    const mention = message.mentions.users.first();
    const user = message.author.id === mention.id ? mention.id : message.author.id; // Just define user as message.author.id if this serves any issue, don't forget to inform me as well.
    if (!xp[user]){
        xp[user] = {
            xp: 0,
            level: 1
        };
    }
    const curxp = xp[user].xp;
    const curlvl = xp[user].level;
    const nxtLvlXp = curlvl * 300;
    const difference = nxtLvlXp - curxp;

    const lvlEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(purple)
        .addField("Level", curlvl, true)
        .addField("XP", curxp, true)
        .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

   const send = message.channel.send(lvlEmbed);
    setTimeout(function() {
        send.delete();
    }, 5000);
};

module.exports.help = {
    name: "level"
};
