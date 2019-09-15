const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const TroopConfiguration = sequelize.define('TroopConfiguration', {
    Type: { type: Sequelize.INTEGER, primaryKey: true  },
    Rank: { type: Sequelize.INTEGER, primaryKey: true },
    Count: { type: Sequelize.INTEGER, primaryKey: false },
    RokAccountName: { type: Sequelize.STRING, primaryKey: true }
},
{
    indexes: [
        {
            unique: true,
            fields: ['Type', 'Rank', 'RokAccountName']
        }
    ]
});

module.exports = TroopConfiguration;