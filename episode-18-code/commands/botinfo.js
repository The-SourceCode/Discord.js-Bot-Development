const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);
    message.channel.send(botembed);
};

module.exports.help = {
  name:"botinfo"
};
