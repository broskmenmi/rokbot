const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './mydb.sqlite3';
const DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_PATH + ' database.')
});
DB.close();

const Sequelize = require('sequelize');

module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: DB_PATH
});