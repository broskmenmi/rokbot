const Sequelize = require('sequelize');
const db = require('../config/database');

const RokAccount = db.define('RokAccount', {
    Name: {
        type: Sequelize.STRING,
        primaryKey: true
    }
});

module.exports = RokAccount;