const Sequelize = require('sequelize');
const db = require('../config/database');

const DiscordUser = db.define('RokAccount', {
    RokAccountName: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    DiscordUserId: {
        type: Sequelize.STRING
        
    }
});

module.exports = DiscordUser;