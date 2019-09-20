const { Command } = require('discord.js-commando');

module.exports = class RokCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            aliases: [],
            group: 'rok',
            memberName: 'test',
            description: 'Replies with the text you provide.',
        });
    }

    run(message) {
        message.say(message.guild.name);
    }
};