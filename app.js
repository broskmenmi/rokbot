const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js');

const client = new Discord.Client();
const dotenv = require('dotenv').config();

const token = process.env.DISCORD_BOT_SECRET;

// db
const db = require('./config/database');

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


client.on('ready', () => {
    console.log("I'm in!");
    console.log(client.user.username);
});
const DiscordUser = require('./models/DiscordUser');
DiscordUser.sync();

client.on('message', msg => {
    if (msg.author.id != client.user.id) {
        //msg.channel.send(msg.content.split('').reverse().join(''));
        
        if (msg.content.startsWith("!")) {
            processCommand(msg)
        }
    }
});

client.login(token);

function processCommand(receivedMessage)
{
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    if (primaryCommand == "tc" && arguments.length == 0) {

        DiscordUser.findAll()
        .then(discordUsers => {
            console.log(discordUsers);

            if (discordUsers.length > 0)
            {
                receivedMessage.channel.send(discordUsers.map(user => { return user.DiscordUserId + "\n"; }));
            } else {
                receivedMessage.channel.send("No troops recorded so far!");
            }
        })
        .catch(err => {
            console.log(err);
        });
    } else if (primaryCommand == "tc" && arguments.length > 0) {
        DiscordUser.create({ DiscordUserId: receivedMessage.author.id }).then().catch(err => console.log(err));
    } else {
        receivedMessage.channel.send("I don't understand the command.")
    }
}