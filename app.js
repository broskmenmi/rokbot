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
const RokAccount = require('./models/RokAccount');
const Alliance = require('./models/Alliance');
const TroopConfiguration = require('./models/TroopConfiguration');

RokAccount.belongsTo(DiscordUser);
RokAccount.belongsTo(Alliance);
TroopConfiguration.belongsTo(RokAccount);

DiscordUser.sync();
RokAccount.sync();
Alliance.sync();
TroopConfiguration.sync();

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
        receivedMessage.channel.send("DISPLAY HELP HERE! Tag the user!");
    } else if (primaryCommand == "tc" && arguments.length == 1) {
        // !tc all
        if (arguments[0] == "input")
            startInput(receivedMessage);

        switch (arguments[0])
        {
            case "show":

            case "showAll":

                exports.getAllTroops().then(troops => {
                if (troops.length > 0)
                {
                    receivedMessage.channel.send(troops.map(user => { return user.id + "\n"; }));
                } else {
                    receivedMessage.channel.send("No troops recorded so far!");
                }
            });
    
            case "input": 
                break;
        
            default: 
        }

    } else {
        receivedMessage.channel.send("I don't understand the command.")
    }
}

exports.getAllTroops = function getAllTroops(currentUser)
{
    return new Promise((resolve, reject) => {
        
        DiscordUser.findAll()
        .then(discordUsers => {
            return resolve(discordUsers);
        })
        .catch(err => {
            console.log(err);
            return reject(err);
        });

    });
}

function startInput(receivedMessage) {
    DiscordUser.create({ DiscordUserId: receivedMessage.author.id }).then().catch(err => console.log(err));
}