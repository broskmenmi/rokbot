const Sequelize = require('sequelize');
const { sequelize } = require('../config/database');

const Alliance = sequelize.define('Alliance', {
    Name: { type: Sequelize.STRING, primaryKey: true },
    ShortName: { type: Sequelize.STRING }
});

module.exports = Alliance;