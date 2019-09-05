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

// db end

client.on('ready', () => {
    console.log("I'm in!");
    console.log(client.user.username);
});

client.on('message', msg => {
    if (msg.author.id != client.user.id) {
        //msg.channel.send(msg.content.split('').reverse().join(''));

        if (msg.content.startsWith("!")) {
            processCommand(msg)
        }
    }
});

client.login(token);

function processCommand(receivedMessage) {
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

        switch (arguments[0]) {
            case "show":

                exports.getAllTroops(receivedMessage.author.id).then(troops => {
                    console.log("getAllTroops from current user!");
                    if (troops.length > 0) {
                        receivedMessage.channel.send(troops.map(user => { return user.id + "\n"; }));
                    } else {
                        receivedMessage.channel.send("No troops recorded so far!");
                    }
                });
                break;

            case "showAll":

                exports.getAllTroops().then(troops => {
                    console.log("getAllTroops from allusers!");
                    if (troops.length > 0)
                        receivedMessage.channel.send(troops.map(user => { return user.id + "\n"; }));
                    else
                        receivedMessage.channel.send("No troops recorded so far!");
                });
                break;

            case "input":

                exports.startInput(receivedMessage);

                break;

            default:
        }

    } else {
        receivedMessage.channel.send("I don't understand the command.")
    }
}

exports.getAllTroops = function getAllTroops(currentUser) {
    return new Promise((resolve, reject) => {

        var whereClause = {};

        if (currentUser)
            whereClause['DiscordUserId'] = currentUser;

        TroopConfiguration.findAll({
            include: [{
                model: RokAccount,
                where: whereClause
            }]
        }).then(troops => {
            return resolve(troops);
        }).catch(err => {
            console.log(err);
            return reject(err);
        });

    });
}

exports.startInput = function startInput(receivedMessage) {
    return new Promise((resolve, reject) => {
        
        var tempData = {};
        tempData['AllianceName'] = 'SpartanZ';
        tempData['Rank'] = '4';
        tempData['TroppType'] = 'Cavalry';
        tempData['TroppCount'] = '20000';
        tempData['TroppRank'] = '4';

        // ask for rank

        // ask for t5 cav

        // ask for t5 infantry

        // ask for t5 archery

        // ask for t5 siege

        // ask for t4 cavalry
        
        // ask for t4 infantry
        
        // ask for t5 siege
        
        // ask for t5 siege


        sequelize.transaction(t =>
            Project.create(project, {
                include: [{
                    model: User,
                    as: 'Users',
                }],
                transaction: t,
            })
        ).then(

        ).catch(err => { 
            return reject(err);
        });
    });

    //DiscordUser.create({ DiscordUserId: receivedMessage.author.id }).then().catch(err => console.log(err));
}