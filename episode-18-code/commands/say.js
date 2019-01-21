const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  message.channel.send(args.join(" "));
};

module.exports.help = {
  name: "say"
};
