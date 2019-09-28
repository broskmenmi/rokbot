const { Command } = require('discord.js-commando');

module.exports = class ListRokCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'ltc',
            aliases: ['listtroopcount', 'isitwartimeyet'],
            group: 'rok',
            memberName: 'ltc',
            description: 'Replies with the text you provide.',
        });
    }

    async run(message) {
        const { DiscordUser } = require('../../models/DiscordUser');

        const people = await DiscordUser.query().eager('rokAccounts');
        message.say(JSON.stringify(people));
        
        // const  AsciiTable = require('ascii-table');
        // var table = new AsciiTable(`The mighty army of ${message.guild.name}`)
        // table.setHeading('', 'Name', 'Age')
        // people.forEach(item => {
        //     table.addRow(item.rokAccounts[0].name, '','')
        // });
        // message.say(table.toString());



    }
};