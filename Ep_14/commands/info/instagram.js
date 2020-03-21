const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const Shitgram = new (require('Shitgram'))();

module.exports = {
    name: "instagram",
    aliases: ["insta", "ig"],
    category: "info",
    description: "Find out some nice instagram statistics",
    usage: "<name>",
    run: async (client, message, args) => {
        Shitgram.user(args[0])
            .then((user) => {
                const embed = new RichEmbed()
                    .setColor("RANDOM")
                    .setTitle(user.username)
                    .setURL(user.url)
                    .setThumbnail(user.avatarURL)
                    .addField("Profile information", stripIndents`**- Username:** ${user.username}
                    **- Full name:** ${user.fullname || '-'}
                    **- Biography:** ${user.biography}
                    **- Posts:** ${user.posts}
                    **- Followers:** ${user.followers}
                    **- Following:** ${user.following}
                    **- Private account:** ${user.isPrivate ? "Yes 🔐" : "Nope 🔓"}`);
            })
            .catch((error) => {
                const embed = new RichEmbed()
                    .setColor('#FFCA42')
                    .setDescription(`\`\`\`js ERROR: ${error}\`\`\``)
                message.channel.send(embed);
            });
    }
};