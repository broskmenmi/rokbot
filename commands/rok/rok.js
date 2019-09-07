const { RichEmbed } = require("discord.js");

module.exports = {
    name: "rok",
    aliases: ["roc", "thisisspartanz"],
    category: "game",
    description: "Game related stuff",
    usage: "<input>",
    run: (client, message, args) => {
        //message.delete();

        // if (!message.member.hasPermission("MANAGE_MESSAGES"))
        //     return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

        if (args.length < 0)
            return message.reply(this.description + "\n" + this.usage).then(m => m.delete(5000));

        const roleColor = message.guild.me.highestRole.hexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" : roleColorv)
                .setTimestamp()
                .setImage(client.user.displayAvatarUrl);

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}