const Discord = require("discord.js");
const { orange } = require("../botconfig.json");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(args[0] === "help") return message.reply("Usage: !report <user> <reason>");

    const rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) rreason = "None provided.";

    const reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor(orange)
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);

    const reportschannel = message.guild.channels.find(c => c.name === "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
    reportschannel.send(reportEmbed);
};

module.exports.help = {
  name: "report"
};
