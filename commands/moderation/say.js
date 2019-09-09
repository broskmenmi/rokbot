const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');


class sayCommand extends Command{

    constructor(client){

        super( client, {
            name: 'say',
            memberName: 'say',
            aliases: ['say'],
            group: 'moderation',
            description: 'Responds with "pong".',
            details: 'The traditional ping-pong.',
            examples: ['!ping'],
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to embed?',
                    type: 'string'
                }
            ]
        })
    }

    run(msg, args){
        msg.delete();
        
        const { text } = args;
        const embed = new RichEmbed()
            .setDescription(text)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setColor(0x00AE86)
            .setTimestamp();
        msg.embed(embed);
    }
}

module.exports = sayCommand;

// const { RichEmbed } = require("discord.js");

// module.exports = {
//     name: "say",
//     aliases: ["bc", "broadcast"],
//     category: "moderation",
//     description: "Says your input via the bot",
//     usage: "<input>",
//     run: (client, message, args) => {
//         message.delete();

//         if (!message.member.hasPermission("MANAGE_MESSAGES"))
//             return message.reply("You don't have the required permissions to use this command.").then(m => m.delete(5000));

//         if (args.length < 0)
//             return message.reply("Nothing to say?").then(m => m.delete(5000));

//         const roleColor = message.guild.me.highestRole.hexColor;

//         if (args[0].toLowerCase() === "embed") {
//             const embed = new RichEmbed()
//                 .setDescription(args.slice(1).join(" "))
//                 .setColor(roleColor === "#000000" ? "#ffffff" : roleColorv)
//                 .setTimestamp()
//                 .setImage(client.user.displayAvatarUrl);

//             message.channel.send(embed);
//         } else {
//             message.channel.send(args.join(" "));
//         }
//     }
// }