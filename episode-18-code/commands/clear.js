const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    if (!args[0] || isNaN(args[0])) return message.channel.send("Specify an amount of messages to remove");
    // Discord API limits us to 100 message bulkDelete limits
    // We will collect messages to show exactly how much messages were deleted, not just the argument.
    const collector = await message.channel.fetchMessages({limit: args[0]});
    if (args[0] >= 100) return message.reply("I can only delete less than 100 messages at once.");
    await message.channel.bulkDelete(collector);
    const send = message.reply(`Successfully deleted ${collector.size} messages!`); // send can now serve as a personal message object.
    // Let's avoid callbacks because they are messy.
    setTimeout(function() {
        send.delete();
    }, 5000)
};

module.exports.help = {
    name: "clear"
};
