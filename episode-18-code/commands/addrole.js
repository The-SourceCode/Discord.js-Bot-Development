const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @user Dog Person

  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] === "help") return message.reply("Usage: `!addrole @user role");
  const rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  const role = args.join(" ").slice(22);
  if (!role) return message.reply("Specify a role!");
  const gRole = message.guild.roles.find(r => r.name === role);
  if (!gRole) return message.reply("Couldn't find that role.");

  if (rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await (rMember.addRole(gRole.id));

  try {
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`);
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
};

module.exports.help = {
  name: "addrole"
};
