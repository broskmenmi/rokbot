const { Command } = require('discord.js-commando');
const { transaction } = require ('objection');

module.exports = class TestCommands extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            aliases: [],
            group: 'rok',
            memberName: 'test',
            description: 'Replies with the text you provide.',
        });
    }

    async run(message) {
        const { DiscordUser } = require('../../models/DiscordUser');
        const { Alliance } = require('../../models/Alliance');
        const { RokAccount } = require('../../models/RokAccount');

        var discordUser = {}
        discordUser.id = '400137876894908416';

        var upsertedGraph = await transaction(DiscordUser.knex(), async (trx) => {
            const graph = await DiscordUser.query(trx).upsertGraph(discordUser, { insertMissing: true })
            return graph;
        });

        console.log('upsertGraph results 1');
        console.log(upsertedGraph);

        var rokAccount = {};
        rokAccount.name = 'brosk';
        rokAccount.discordUserId = '400137876894908416';
        rokAccount.allianceId = message.guild.name;
        rokAccount.rank = 2;
        rokAccount.maxRallySize = 1000000;

        upsertedGraph = await transaction(RokAccount.knex(), async (trx) => {
            const graph = await RokAccount.query(trx).upsertGraph(rokAccount, { insertMissing: true })
            return graph;
        });

        console.log('upsertGraph results 2');
        console.log(upsertedGraph);

        var alliance = {};
        alliance.id = message.guild.name;

        upsertedGraph = await transaction(Alliance.knex(), async (trx) => {
            const graph = await Alliance.query(trx).upsertGraph(alliance, { insertMissing: true })
            return graph;
        });

        console.log('upsertGraph results 3');
        console.log(upsertedGraph);

    }
};