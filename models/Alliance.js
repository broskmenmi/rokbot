const Sequelize = require('sequelize');
const db = require('../config/database');

const Alliance = db.define('Alliance', {
    Name: { type: Sequelize.STRING, primaryKey: true },
    ShortName: { type: Sequelize.STRING }
});

module.exports = Alliance;