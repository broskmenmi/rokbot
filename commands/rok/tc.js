const { Command } = require('discord.js-commando');
const { transaction } = require('objection');
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
        const { Alliance } = require('../../models/Alliance');
        const { RokAccount } = require('../../models/RokAccount');
        const { TroopConfiguration } = require('../../models/TroopConfiguration')

        var discordUser = {};
        discordUser.id = message.author.id;

        var rokAccount = {};
        rokAccount.discordUserId = message.author.id;
        rokAccount.name = nickName;
        rokAccount.rank = rank;
        rokAccount.maxRallySize = rallySize;
        rokAccount.allianceId = message.guild.name;

        var alliance = {};
        alliance.id = message.guild.name;

        var army = [];
        army.push(this.getTroopConfiguration('Cavalry', 5, t5CavalryCount, nickName));
        army.push(this.getTroopConfiguration('Infantry', 5, t5InfantryCount, nickName));
        army.push(this.getTroopConfiguration('Archery', 5, t5ArcheryCount, nickName));
        army.push(this.getTroopConfiguration('Siege', 5, t5SiegeCount, nickName));
        army.push(this.getTroopConfiguration('Cavalry', 4, t4CavalryCount, nickName));
        army.push(this.getTroopConfiguration('Infantry', 4, t4InfantryCount, nickName));
        army.push(this.getTroopConfiguration('Archery', 4, t4ArcheryCount, nickName));
        army.push(this.getTroopConfiguration('Siege', 4, t4SiegeCount, nickName));

        let upsertedGraph = await transaction(DiscordUser.knex(), async (trx) => {
            return await DiscordUser.query(trx).upsertGraph(discordUser, { insertMissing: true })
        });

        upsertedGraph = await transaction(Alliance.knex(), async (trx) => {
            return await Alliance.query(trx).upsertGraph(alliance, { insertMissing: true })
        });

        upsertedGraph = await transaction(RokAccount.knex(), async (trx) => {
            return await RokAccount.query(trx).upsertGraph(rokAccount, { insertMissing: true })
        });

        upsertedGraph = await transaction(RokAccount.knex(), async (trx) => {
            await TroopConfiguration.query(trx).upsertGraph(army[0], { insertMissing: true })
            await TroopConfiguration.query(trx).upsertGraph(army[1], { insertMissing: true })
            await TroopConfiguration.query(trx).upsertGraph(army[2], { insertMissing: true })
            await TroopConfiguration.query(trx).upsertGraph(army[3], { insertMissing: true })
            await TroopConfiguration.query(trx).upsertGraph(army[4], { insertMissing: true })
            await TroopConfiguration.query(trx).upsertGraph(army[5], { insertMissing: true })
            await TroopConfiguration.query(trx).upsertGraph(army[6], { insertMissing: true })
            await TroopConfiguration.query(trx).upsertGraph(army[7], { insertMissing: true })
        });
    }

    getTroopConfiguration(type, rank, count, nickName) {
        var troopConfiguration = {};
        troopConfiguration.type = type;
        troopConfiguration.rank = rank;
        troopConfiguration.count = count;
        troopConfiguration.rokAccountId = nickName;

        return troopConfiguration;
    }
};