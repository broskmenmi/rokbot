// const Discord = require('discord.js');
// const keep_alive = require('./keep_alive.js');

// const client = new Discord.Client();

// client.commands = new Discord.Collection();
// client.aliases = new Discord.Collection();


// // Run the command loader
// ["commands"].forEach(handler => {
//     require(`./handlers/${handler}`)(client);
// });

// client.on('ready', () => {
//     console.log("I'm in!");
//     console.log(client.user.username);
// });

// client.on('message', async message => {
//     const prefix = "!";

//     if (message.author.bot) return;
//     if (!message.guild) return;
//     if (!message.content.startsWith(prefix)) return;

//     // If message.member is uncached, cache it.
//     if (!message.member) message.member = await message.guild.fetchMember(message);

//     const args = message.content.slice(prefix.length).trim().split(/ +/g);
//     const cmd = args.shift().toLowerCase();
    
//     if (cmd.length === 0) return;
    
//     // Get the command
//     let command = client.commands.get(cmd);
//     // If none is found, try to find it by alias
//     if (!command) command = client.commands.get(client.aliases.get(cmd));

//     // If a command is finally found, run the command
//     if (command) 
//         command.run(client, message, args);

//     // if (msg.author.id != client.user.id) {
//     //     //msg.channel.send(msg.content.split('').reverse().join(''));

//     //     if (msg.content.startsWith("!")) {
//     //         processCommand(msg)
//     //     }
//     // }
// });

// // client.login(token);

// function processCommand(receivedMessage) {
//     let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
//     let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
//     let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
//     let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

//     if (primaryCommand == "tc" && arguments.length == 0) {
//         receivedMessage.channel.send("DISPLAY HELP HERE! Tag the user!");
//     } else if (primaryCommand == "tc" && arguments.length == 1) {
//         // !tc all
//         if (arguments[0] == "input")
//             startInput(receivedMessage);

//         switch (arguments[0]) {
//             case "show":

//                 exports.getAllTroops(receivedMessage.author.id).then(troops => {
//                     console.log("getAllTroops from current user!");
//                     if (troops.length > 0) {
//                         receivedMessage.channel.send(troops.map(user => { return user.id + "\n"; }));
//                     } else {
//                         receivedMessage.channel.send("No troops recorded so far!");
//                     }
//                 });
//                 break;

//             case "showAll":

//                 exports.getAllTroops().then(troops => {
//                     console.log("getAllTroops from allusers!");
//                     if (troops.length > 0)
//                         receivedMessage.channel.send(troops.map(user => { return user.id + "\n"; }));
//                     else
//                         receivedMessage.channel.send("No troops recorded so far!");
//                 });
//                 break;

//             case "input":

//                 exports.startInput(receivedMessage);

//                 break;

//             default:
//         }

//     } else {
//         receivedMessage.channel.send("I don't understand the command.")
//     }
// }

// exports.getAllTroops = function getAllTroops(currentUser) {
//     return new Promise((resolve, reject) => {

//         var whereClause = {};

//         if (currentUser)
//             whereClause['DiscordUserId'] = currentUser;

//         TroopConfiguration.findAll({
//             include: [{
//                 model: RokAccount,
//                 where: whereClause
//             }]
//         }).then(troops => {
//             return resolve(troops);
//         }).catch(err => {
//             console.log(err);
//             return reject(err);
//         });

//     });
// }

// exports.startInput = function startInput(receivedMessage) {
//     return new Promise((resolve, reject) => {
        
//         var tempData = {};

//         // ask for ingame name
//         tempData['RokAccountName'] = getInputFromUser('What\'s your ingame name?');

//         // ask for rank
//         tempData['Rank'] = getInputFromUser('What\'s your ingame rank?');

//         // ask for t5 cav
//         tempData['TroppType'] = 'Cavalry';
//         tempData['TroppRank'] = '5';        
//         tempData['TroppCount'] = getInputFromUser('What\'s your Cavalry T5 count?');
//         exports.save(tempData);

//         // ask for t5 infantry
//         tempData['TroppType'] = 'Infantry';
//         tempData['TroppRank'] = '5';        
//         tempData['TroppCount'] = getInputFromUser('What\'s your Infantry T5 count?');
//         exports.save(tempData);

//         // ask for t5 archery
//         tempData['TroppType'] = 'Archery';
//         tempData['TroppRank'] = '5';        
//         tempData['TroppCount'] = getInputFromUser('What\'s your Archery T5 count?');
//         exports.save(tempData);

//         // ask for t5 siege
//         tempData['TroppType'] = 'Siege';
//         tempData['TroppRank'] = '5';        
//         tempData['TroppCount'] = getInputFromUser('What\'s your Siege T5 count?');
//         exports.save(tempData);

//         // ask for t4 cavalry
//         tempData['TroppType'] = 'Cavalry';
//         tempData['TroppRank'] = '4';        
//         tempData['TroppCount'] = getInputFromUser('What\'s your Cavalry T4 count?');
//         exports.save(tempData);
        
//         // ask for t4 infantry
//         tempData['TroppType'] = 'Infantry';
//         tempData['TroppRank'] = '4';        
//         tempData['TroppCount'] = getInputFromUser('What\'s your Infantry T4 count?');
//         exports.save(tempData);

//         // ask for t4 archery
//         tempData['TroppType'] = 'Archery';
//         tempData['TroppRank'] = '4';        
//         tempData['TroppCount'] = getInputFromUser('What\'s your Archery T4 count?');
//         exports.save(tempData);

//         // ask for t4 siege
//         tempData['TroppType'] = 'Siege';
//         tempData['TroppRank'] = '4';        
//         tempData['TroppCount'] = getInputFromUser('What\'s your Siege T4 count?');
//         exports.save(tempData);

//     });
// }



// New
const { CommandoClient, Command } = require('discord.js-commando');
const path = require('path');

const dotenv = require('dotenv').config();
const token = process.env.DISCORD_BOT_SECRET;

// db
const { sequelize, Db } = require('./config/database');

sequelize.authenticate()
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


const client = new CommandoClient({
	commandPrefix: '!',
	owner: '400137876894908416'
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['moderation', 'Moderation commands'],
		['info', 'Userful info commands'],
		['rok', 'Rise of Kingdom commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));


client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('with himself!');

	let channels = client.channels.filter(chan =>{chan.type == 'text' });
	console.log(channels.size);
	channels.map(chan => { chan.send('BEHOLD! RokBOT HAS ARRIVED!'); console.log(chan.id); });
});


client.on('error', console.error);

client.login(token);