const Sequelize = require('sequelize');
const db = require('../config/database');

const TroopConfiguration = db.define('TroopConfiguration', {
    Type: { type: Sequelize.INTEGER, primaryKey: true  },
    Rank: { type: Sequelize.INTEGER, primaryKey: true },
    Count: { type: Sequelize.INTEGER, primaryKey: true }
},
{
    indexes: [
        {
            unique: true,
            fields: ['Type', 'Rank', 'Count']
        }
    ]
});

module.exports = TroopConfiguration;