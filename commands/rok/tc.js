const { Command } = require('discord.js-commando');
const { sequelize, Sequelize } = require('../../config/database')

module.exports = class RokCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'tc',
            aliases: ['troopcount', 'wartime'],
            group: 'rok',
            memberName: 'tc',
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

    run(message, { nickName, rank, rallySize, t5CavalryCount, t5InfantryCount, t5ArcheryCount, t5SiegeCount, t4CavalryCount, t4InfantryCount, t4ArcheryCount, t4SiegeCount }) {
        let DiscordUser = require('../../models/DiscordUser');
        let RokAccount = require('../../models/RokAccount');
        let Alliance = require('../../models/Alliance');
        let TroopConfiguration = require('../../models/TroopConfiguration');

        // RokAccount.belongsTo(DiscordUser);
        // RokAccount.belongsTo(Alliance);
        // RokAccount.hasMany(TroopConfiguration, {as: 'army', foreignKey: 'RokAccountName'});

        DiscordUser.Id = message.author.id;
        RokAccount.DiscordUserId = DiscordUser.Id;
        RokAccount.Name = nickName;
        RokAccount.Rank = rank;
        RokAccount.MaxRallySize = rallySize;
        Alliance.Name = message.guild.name;
        
        sequelize.transaction({type: Sequelize.Transaction.TYPES.IMMEDIATE}, t => {
            
        return Alliance.upsert(Alliance).then(DiscordUser.upsert(DiscordUser).then(
            RokAccount.upsert(RokAccount))).then(
                TroopConfiguration.upsert(this.getTroopConfiguration('Cavalry', 5, t5CavalryCount, nickName), { transaction: t })).then(
                    TroopConfiguration.upsert(this.getTroopConfiguration('Infantry', 5, t5InfantryCount, nickName), { transaction: t })).then(
                        TroopConfiguration.upsert(this.getTroopConfiguration('Archery', 5, t5ArcheryCount, nickName), { transaction: t })).then(
                            TroopConfiguration.upsert(this.getTroopConfiguration('Siege', 5, t5SiegeCount, nickName), { transaction: t })).then(
                                TroopConfiguration.upsert(this.getTroopConfiguration('Cavalry', 4, t4CavalryCount, nickName), { transaction: t })).then(
                                    TroopConfiguration.upsert(this.getTroopConfiguration('Infantry', 4, t4InfantryCount, nickName), { transaction: t })).then(
                                        TroopConfiguration.upsert(this.getTroopConfiguration('Archery', 4, t4ArcheryCount, nickName), { transaction: t })).then(
                                            TroopConfiguration.upsert(this.getTroopConfiguration('Siege', 4, t4SiegeCount, nickName), { transaction: t }));
    }).then(() => { console.log('Success!') }).catch(err => { console.log("Error: " + err) });
    }

    getTroopConfiguration(type, rank, count, nickName) {
        let TroopConfiguration = require('../../models/TroopConfiguration');
        TroopConfiguration.Type = type;
        TroopConfiguration.Rank = rank;
        TroopConfiguration.Count = count;
        TroopConfiguration.RokAccountName = nickName;

        return TroopConfiguration;
    }
};