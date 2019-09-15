const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './mydb.sqlite3';
// const DB = new sqlite3.Database(DB_PATH, function(err){
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log('Connected to ' + DB_PATH + ' database.');

//     DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
//         if (error){
//             console.error("Pragma statement didn't work.")
//         } else {
//             console.log("Foreign Key Enforcement is on.")
//         }
//     });
// });

// // Clear errorneus data
// DB.close();

const Sequelize = require('sequelize');
const sequelize =  new Sequelize({
    dialect: 'sqlite',
    storage: DB_PATH
});

module.exports = {
    sequelize, Sequelize
};