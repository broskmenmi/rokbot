const { CommandoClient, Command } = require('discord.js-commando');
const path = require('path');

const dotenv = require('dotenv').config();
const token = process.env.DISCORD_BOT_SECRET;

// db
const { sequelize, DB } = require('./config/database');

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const DiscordUser = require('./models/DiscordUser');
const Alliance = require('./models/Alliance');
const RokAccount = require('./models/RokAccount');
const TroopConfiguration = require('./models/TroopConfiguration');

//sequelize.drop();

DiscordUser.hasOne(RokAccount, {as: 'accountRleation', foreignKey: 'DiscordUserId'});
Alliance.hasOne(RokAccount, {as: 'allianceMember', foreignKey: 'AllianceName'});
RokAccount.hasMany(TroopConfiguration, {as: 'army', foreignKey: 'RokAccountName'});


DiscordUser.sync();
Alliance.sync();
RokAccount.sync();
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
	let channels = client.channels.filter(c => c.type == 'text');
	channels.map(chan => { chan.send('BEHOLD! RokBOT HAS ARRIVED!'); });
});


client.on('error', console.error);

client.login(token);