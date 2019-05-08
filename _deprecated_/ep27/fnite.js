const Discord = require("discord.js");
const Client = require("fortnite");
const fkey = require("../fortnite.json")
const fortnite = new Client(fkey.token)
module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  await message.delete();
  if (message.author.id !== '178657593030475776') return;

  const filter = m => m.author.id === message.author.id;
  message.reply("Please chose a username... Will expire in 10 seconds...").then(q => q.delete(15000))
  message.channel.awaitMessages(filter, {
    max: 1,
    time: 10000
  }).then(collected => {
    collected.delete(15000);
    if (collected.first().content === 'cancel') {
      return message.reply("Canceled.");
    }

    let username = collected.first().content;

    fortnite.user(username, 'pc').then(data => {
      //console.log(data.stats.lifetime)
      let embed = new Discord.RichEmbed()
        .setTitle(username)
        .setColor("BLURPLE")
        .setDescription("Lifetime Stats")
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("Top 3s", data.stats.lifetime[1]["Top 3s"], true)
        .addField("Top 5s", data.stats.lifetime[0]["Top 5s"], true)
        .addField("Wins", data.stats.lifetime[8]["Wins"], true)
        .addField("Win/Lose", data.stats.lifetime[9]["Win%"], true)
        .addField("Kills", data.stats.lifetime[10]["Kills"], true)
        .addField("K/D", data.stats.lifetime[11]["K/d"], true);
      return message.channel.send(embed);
    }).catch(err => {
      message.reply("Could not find user... Double check spelling").then(r => r.delete(5000));
    });
  }).catch(err => {
    message.reply("Cancelled...").then(r => r.delete(5000));
    console.log("Time exceeded. Message await cancelled.");
  });
}
//name this whatever the command name is.
module.exports.help = {
  name: "fnite",
  alias: "ft"
}