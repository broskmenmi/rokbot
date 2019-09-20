const { Command } = require('discord.js-commando');
// const { sequelize, Sequelize } = require('../../config/database')

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
                // {
                //     key: 't5InfantryCount',
                //     prompt: 'What\'s your Infantry T5 count?',
                //     type: 'string'
                // },
                // {
                //     key: 't5ArcheryCount',
                //     prompt: 'What\'s your Archery T5 count?',
                //     type: 'string'
                // },
                // {
                //     key: 't5SiegeCount',
                //     prompt: 'What\'s your Siege T5 count?',
                //     type: 'string'
                // },
                // {
                //     key: 't4CavalryCount',
                //     prompt: 'What\'s your Cavalry T4 count?',
                //     type: 'string'
                // },
                // {
                //     key: 't4InfantryCount',
                //     prompt: 'What\'s your Infantry T4 count?',
                //     type: 'string'
                // },
                // {
                //     key: 't4ArcheryCount',
                //     prompt: 'What\'s your Archery T4 count?',
                //     type: 'string'
                // },
                // {
                //     key: 't4SiegeCount',
                //     prompt: 'What\'s your Siege T4 count?',
                //     type: 'string'
                // }
            ],

        });
    }

    run(message, { nickName, rank, rallySize, t5CavalryCount, t5InfantryCount, t5ArcheryCount, t5SiegeCount, t4CavalryCount, t4InfantryCount, t4ArcheryCount, t4SiegeCount }) {
        let DiscordUser = require('../../models/DiscordUser');
        const { RokAccount } = require('../../models/RokAccount');
        const { Alliance } = require('../../models/Alliance');
        let TroopConfiguration = require('../../models/TroopConfiguration');

        // RokAccount.belongsTo(DiscordUser);
        // RokAccount.belongsTo(Alliance);
        // RokAccount.hasMany(TroopConfiguration, {as: 'army', foreignKey: 'RokAccountName'});

        // DiscordUser.Id = message.author.id;
        // Alliance.Name = message.guild.name;
        // RokAccount.DiscordUserId = DiscordUser.Id;
        // RokAccount.Name = nickName;
        // RokAccount.Rank = rank;
        // RokAccount.MaxRallySize = rallySize;
        // RokAccount.AllianceName = message.guild.name;

        // sequelize.transaction({type: Sequelize.Transaction.TYPES.IMMEDIATE}, t => {

        // return Promise.all([
        // DiscordUser.upsert(DiscordUser)
        // Alliance.upsert(Alliance)
        // RokAccount.upsert(RokAccount)
        // TroopConfiguration.upsert(this.getTroopConfiguration('Cavalry', 5, t5CavalryCount, nickName))
        // TroopConfiguration.upsert(this.getTroopConfiguration('Infantry', 5, t5InfantryCount, nickName))
        // TroopConfiguration.upsert(this.getTroopConfiguration('Archery', 5, t5ArcheryCount, nickName))
        // TroopConfiguration.upsert(this.getTroopConfiguration('Siege', 5, t5SiegeCount, nickName))
        // TroopConfiguration.upsert(this.getTroopConfiguration('Cavalry', 4, t4CavalryCount, nickName))
        // TroopConfiguration.upsert(this.getTroopConfiguration('Infantry', 4, t4InfantryCount, nickName))
        // TroopConfiguration.upsert(this.getTroopConfiguration('Archery', 4, t4ArcheryCount, nickName))
        // TroopConfiguration.upsert(this.getTroopConfiguration('Siege', 4, t4SiegeCount, nickName))
        
        var allianceData = {};
        allianceData.Name = message.guild.name;
        const allianceGraph = Alliance.query().upsertGraph(allianceData);

        var blob = {};
        // blob.DiscordUser.id = message.author.id;
        // blob.DiscordUser.rokAccounts[0].DiscordUserId = blob.DiscordUser.id;
        // blob.DiscordUser.rokAccounts[0].Name = nickName;
        // blob.DiscordUser.rokAccounts[0].Rank = rank;
        // blob.DiscordUser.rokAccounts[0].MaxRallySize = rallySize;
        // blob.DiscordUser.rokAccounts[0].AllianceName = message.guild.name;
        // blob.DiscordUser.rokAccounts[0].AllianceName = message.guild.name;

        blob.discordUser = {};
        blob.discordUser.id = message.author.id;
        
        blob.alliance = {};
        blob.alliance.name = message.guild.name;
        
        blob.army = {};
        blob.army[0] = this.getTroopConfiguration('Cavalry', 5, t5CavalryCount, nickName);
        blob.army[0] = this.getTroopConfiguration('Infantry', 5, t5InfantryCount, nickName);
        blob.army[0] = this.getTroopConfiguration('Archery', 5, t5ArcheryCount, nickName);
        blob.army[0] = this.getTroopConfiguration('Siege', 5, t5SiegeCount, nickName);
        blob.army[0] = this.getTroopConfiguration('Cavalry', 4, t4CavalryCount, nickName);
        blob.army[0] = this.getTroopConfiguration('Infantry', 4, t4InfantryCount, nickName);
        blob.army[0] = this.getTroopConfiguration('Archery', 4, t4ArcheryCount, nickName);
        blob.army[0] = this.getTroopConfiguration('Siege', 4, t4SiegeCount, nickName);
        const troopGraph = RokAccount.query().upsertGraph(blob);
        console.log(troopGraph);
    }

    getTroopConfiguration(type, rank, count, nickName) {
        var TroopConfiguration = {};
        TroopConfiguration.Type = type;
        TroopConfiguration.Rank = rank;
        TroopConfiguration.Count = count;
        TroopConfiguration.RokAccountName = nickName;

        return TroopConfiguration;
    }
};