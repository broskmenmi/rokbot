'use strict';

const { CommandoClient, Command } = require('discord.js-commando');
const path = require('path');

const dotenv = require('dotenv').config();
const token = process.env.DISCORD_BOT_SECRET;

// db start
const { Model } = require('objection');
const knexConfig = require('./knexfile.js')['development'];
const Knex = require('knex')(knexConfig)
Model.knex(Knex);
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