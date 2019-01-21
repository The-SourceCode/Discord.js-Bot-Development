const Discord = require("discord.js");
const fs = require("file-system");
const config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("Insufficient Permission")
        .setColor(config.red)
        .addField("Permission needed", perm);
    message.channel.send(embed).then(m => m.delete(5000));
};

module.exports.equalPerms = (message, user, perms) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(config.red)
        .setTitle("Error")
        .addField(`${user} has perms`, perms);
    message.channel.send(embed).then(m => m.delete(5000));
};

module.exports.botuser = (message) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("You cannot ban a bot.")
        .setColor(config.red);
    message.channel.send(embed).then(m => m.delete(5000));
};

module.exports.cantfindUser = (channel) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Could not find that user.")
        .setColor(config.red);
    channel.send(embed).then(m => m.delete(5000));
};

module.exports.noReason = (channel) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription("Please supply a reason.")
        .setColor(config.red);
    channel.send(embed).then(m => m.delete(5000));
};
