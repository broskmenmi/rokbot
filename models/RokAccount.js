const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const RokAccount = sequelize.define('RokAccount', {
    Name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Rank: {
        type: Sequelize.INTEGER
    },
    MaxRallySize: {
        type: Sequelize.INTEGER
    }
});

module.exports = RokAccount;