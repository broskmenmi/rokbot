const Sequelize = require('sequelize');
const db = require('../config/database');

const DiscordUser = db.define('DiscordUser', {
    Id: {
        type: Sequelize.STRING,
        primaryKey: true
    }
});

module.exports = DiscordUser;