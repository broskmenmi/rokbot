const { Command } = require('discord.js-commando');
const { transaction } = require ('objection');
// const { sequelize, Sequelize } = require('../../config/database')

module.exports = class RokCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'itc',
            aliases: ['troopcount', 'wartime'],
            group: 'rok',
            memberName: 'itc',
            description: 'Replies with the text you provide.',
            args: [
                {
                    key: 'nickName',
                    prompt: 'What\'s your ingame name?',
                    type: 'string',
                },
                {
                    key: 'rank',
                    prompt: 'What\'s your ingame rank?',
                    type: 'string',
                },
                {
                    key: 'rallySize',
                    prompt: 'What\'s your max rally size?',
                    type: 'string'
                },
                {
                    key: 't5CavalryCount',
                    prompt: 'What\'s your Cavalry T5 count?',
                    type: 'string'
                },
                {
                    key: 't5InfantryCount',
                    prompt: 'What\'s your Infantry T5 count?',
                    type: 'string'
                },
                {
                    key: 't5ArcheryCount',
                    prompt: 'What\'s your Archery T5 count?',
                    type: 'string'
                },
                {
                    key: 't5SiegeCount',
                    prompt: 'What\'s your Siege T5 count?',
                    type: 'string'
                },
                {
                    key: 't4CavalryCount',
                    prompt: 'What\'s your Cavalry T4 count?',
                    type: 'string'
                },
                {
                    key: 't4InfantryCount',
                    prompt: 'What\'s your Infantry T4 count?',
                    type: 'string'
                },
                {
                    key: 't4ArcheryCount',
                    prompt: 'What\'s your Archery T4 count?',
                    type: 'string'
                },
                {
                    key: 't4SiegeCount',
                    prompt: 'What\'s your Siege T4 count?',
                    type: 'string'
                }
            ],

        });
    }

    async run(message, { nickName, rank, rallySize, t5CavalryCount, t5InfantryCount, t5ArcheryCount, t5SiegeCount, t4CavalryCount, t4InfantryCount, t4ArcheryCount, t4SiegeCount }) {
        const { DiscordUser } = require('../../models/DiscordUser');

        var discordUser = {};
        discordUser.userId = message.author.id;
        discordUser.id = 1;
        
        discordUser.rokAccounts = [];
        
        var rokAccount = {};

        rokAccount.name = nickName;
        rokAccount.rank = rank;
        rokAccount.maxRallySize = rallySize;

        rokAccount.alliance = {};
        rokAccount.alliance.name = message.guild.name;

        rokAccount.army = [];
        rokAccount.army.push(this.getTroopConfiguration('Cavalry', 5, t5CavalryCount, nickName));
        rokAccount.army.push(this.getTroopConfiguration('Infantry', 5, t5InfantryCount, nickName));
        rokAccount.army.push(this.getTroopConfiguration('Archery', 5, t5ArcheryCount, nickName));
        rokAccount.army.push(this.getTroopConfiguration('Siege', 5, t5SiegeCount, nickName));
        rokAccount.army.push(this.getTroopConfiguration('Cavalry', 4, t4CavalryCount, nickName));
        rokAccount.army.push(this.getTroopConfiguration('Infantry', 4, t4InfantryCount, nickName));
        rokAccount.army.push(this.getTroopConfiguration('Archery', 4, t4ArcheryCount, nickName));
        rokAccount.army.push(this.getTroopConfiguration('Siege', 4, t4SiegeCount, nickName));

        discordUser.rokAccounts.push(rokAccount);
        console.log(JSON.stringify(discordUser));

        const upsertedGraph = await transaction(DiscordUser.knex(), async(trx) => {
                const armyGraph = await DiscordUser.query(trx).upsertGraph(discordUser, { relate: true, unrelate: true, insertMissing: true })
                return armyGraph;
          });

        console.log('upsertGraph results');
        console.log(upsertedGraph);
    }

    getTroopConfiguration(type, rank, count, nickName) {
        var TroopConfiguration = {};
        TroopConfiguration.type = type;
        TroopConfiguration.rank = rank;
        TroopConfiguration.count = count;

        return TroopConfiguration;
    }
};