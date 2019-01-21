const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(message.guild.iconURL)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

    message.channel.send(serverembed);
};

module.exports.help = {
  name:"serverinfo"
};
