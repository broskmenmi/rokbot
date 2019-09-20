// const { Command } = require('discord.js-commando');
// const { sequelize } = require('../../config/database');
// const  AsciiTable  = require('ascii-table');

// module.exports = class RokCommands extends Command {
//     constructor(client) {
//         super(client, {
//             name: 'list',
//             aliases: ['listtroopcount', 'whatdowehave', 'givemethedetails'],
//             group: 'rok',
//             memberName: 'list',
//             description: 'Replies with the text you provide.',

//         });
//     }

//     run(message) {
//         this.getAllTroops(message.author.id).then(x => {
//             message.say(x.map());
//         });
//     }

//     buildTable(troops) {
//         return new Promise((resolve, reject) => {
//             // build table
//             var table = new AsciiTable('Troops');
//             table.setHeading('PlayerName', 'Rank', 'TimeZone', 'Max Rally count', 'T5 Cav', 'T5 Inf');
            
//             troops.forEach(troopConfiguration => {
//                 table.addRow(troopConfiguration.RokAccountName, troopConfiguration.RokAccount.Rank, 'USA', '1000 000', '2000000', '343434' )
//             });
//             // return resolve(table);
//             // if err
//             // return reject(err)
//         });
//     }

//     getAllTroops(currentUser) {
//         return new Promise((resolve, reject) => {

//             let DiscordUser = require('../../models/DiscordUser');
//             let RokAccount = require('../../models/RokAccount');
//             let Alliance = require('../../models/Alliance');
//             let TroopConfiguration = require('../../models/TroopConfiguration');

//             var whereClause = {};

//             if (currentUser)
//                 whereClause['Id'] = currentUser;

//             // TroopConfiguration.findAll({
//             //     include: [
//             //         {
//             //             model: RokAccount,
//             //             include: [
//             //                 {
//             //                     model: DiscordUser,
//             //                     where: whereClause
//             //                 }
//             //             ]
//             //         }
//             //     ]
//             // }).then(troops => {
//             //     return resolve(troops);
//             // }).catch(err => {
//             //     console.log(err);
//             //     return reject(err);
//             // });

//         });
//     }
// };