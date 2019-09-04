const Sequelize = require('sequelize');
const db = require('../config/database');

const DiscordUser = db.define('DiscordUser', {
    DiscordUserId: {
        type: Sequelize.STRING,
        primaryKey: true
    }
});

module.exports = DiscordUser;