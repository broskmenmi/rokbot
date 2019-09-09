const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const DiscordUser = sequelize.define('DiscordUser', {
    Id: {
        type: Sequelize.STRING,
        primaryKey: true
    }
});

module.exports = DiscordUser;