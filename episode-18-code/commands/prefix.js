const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("No no no.");
    if (!args[0] || args[0 === "help"]) return message.reply("Usage: !prefix <desired prefix here>");

    const prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[message.guild.id] = {
        prefixes: args[0]
    };
    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });
    const sEmbed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle("Prefix Set!")
        .setDescription(`Set to ${args[0]}`);
    message.channel.send(sEmbed);
};

module.exports.help = {
    name: "prefix"
};
