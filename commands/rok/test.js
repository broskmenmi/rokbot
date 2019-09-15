const { Command } = require('discord.js-commando');
const { sequelize } = require('../../config/database')

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