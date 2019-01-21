const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    //!coins <optionalUser>
    const mention = message.mentions.users.first();
    const user = message.author.id === mention.id ? mention.id : message.author.id; // Just define user as message.author.id if this serves any issue, don't forget to inform me as well.
    if(!coins[user]){
        coins[user] = {
            coins: 0
        };
    }
    const uCoins = coins[user].coins;
    const coinEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#00FF00")
        .addField("💸", uCoins);

    const send = message.channel.send(coinEmbed);
    setTimeout(function() {
        send.delete();
    }, 5000);
};

module.exports.help = {
    name: "coins"
};
