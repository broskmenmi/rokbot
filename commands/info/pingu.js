const { Command } = require('discord.js-commando');

class pingCommand extends Command{

    constructor(client){

        super( client, {
            name: 'pingu',
            memberName: 'ping',
            aliases: ['pingu'],
            group: 'info',
            description: 'Responds with "pong".',
            details: 'The traditional ping-pong.',
            examples: ['!ping']
        })
    }

    run(msg){
        //const msg = await message.channel.send(`🏓 Pinging....`);

        msg.say(`🏓 Pong!`);
    }

}

module.exports = pingCommand;